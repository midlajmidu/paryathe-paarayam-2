import React, { useState, useEffect, useCallback } from 'react';
import { GameState, RoundStats } from '../types';
import Header from './Header';
import Footer from './Footer';
import TimerBar from './TimerBar';
import ImageFrame from './ImageFrame';
import PromptInput from './PromptInput';
import ScorePopup from './ScorePopup';
import InstructionsPopup from './InstructionsPopup';

interface GameScreenProps {
  teamId: string;
  timerDuration: number;
  showInstructions: boolean;
  onStartGame: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ 
  teamId, 
  timerDuration, 
  showInstructions: showInstructionsProp, 
  onStartGame 
}) => {
  const [gameState, setGameState] = useState<GameState>(GameState.IDLE);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [promptsUsed, setPromptsUsed] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [roundStats, setRoundStats] = useState<RoundStats | null>(null);
  const [timerKey, setTimerKey] = useState(0);
  const [timeLeft, setTimeLeft] = useState(timerDuration);
  const [localShowInstructions, setLocalShowInstructions] = useState(false);

  // Sync with parent component's showInstructions prop
  useEffect(() => {
    if (showInstructionsProp) {
      setLocalShowInstructions(true);
    }
  }, [showInstructionsProp]);

  const isTimerPaused = gameState === GameState.GENERATING || gameState === GameState.FINISHED || gameState === GameState.IDLE;

  const handleTimeUp = useCallback(() => {
    if (gameState === GameState.PLAYING) {
      setRoundStats({
        teamId,
        timeRemaining: 0,
        promptsUsed: promptsUsed.length,
        score: 0,
      });
      setGameState(GameState.FINISHED);
    }
  }, [gameState, teamId, promptsUsed.length]);

  const handleNextClue = () => {
    if (!currentPrompt.trim()) {
      alert("Prompt cannot be empty!");
      return;
    }
    setGameState(GameState.GENERATING);
    setImageError(null);
    const newPrompts = [...promptsUsed, currentPrompt];
    setPromptsUsed(newPrompts);

    // Use Pollinations.ai for image generation
    const encodedPrompt = encodeURIComponent(currentPrompt);
    // Add a random seed to try and avoid cached images for the same prompt
    const newImageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?seed=${Date.now()}`;
    setImageUrl(newImageUrl);
    
    setCurrentPrompt('');
  };

  const handleImageLoad = () => {
    setGameState(GameState.PLAYING);
  };
  
  const handleImageError = () => {
      setImageError("Failed to load the image. Please try another prompt.");
      setGameState(GameState.PLAYING);
  };

  const handleCorrectGuess = () => {
    setGameState(GameState.FINISHED);
    setRoundStats({
      teamId,
      timeRemaining: timeLeft,
      promptsUsed: promptsUsed.length,
      score: timeLeft * 2,
    });
  };

  const handleNextRound = () => {
    setGameState(GameState.IDLE);
    setCurrentPrompt('');
    setPromptsUsed([]);
    setImageUrl(null);
    setRoundStats(null);
    setImageError(null);
    setTimerKey(prev => prev + 1);
    setTimeLeft(timerDuration);
  };

  const handleStartAfterInstructions = () => {
    setLocalShowInstructions(false);
    onStartGame();
    handleNextRound();
    setGameState(GameState.PLAYING);
  };

  useEffect(() => {
    const handleGuessButtonClick = () => {
      if (gameState === GameState.PLAYING) {
        handleCorrectGuess();
      }
    };

    window.addEventListener('guessButtonClick', handleGuessButtonClick);
    return () => {
      window.removeEventListener('guessButtonClick', handleGuessButtonClick);
    };
  }, [gameState]);

  return (
    <div className="flex flex-col h-screen w-screen bg-stone-800 font-serif overflow-hidden">
      {localShowInstructions && <InstructionsPopup onClose={handleStartAfterInstructions} />}
      <Header />
      <TimerBar
        key={timerKey}
        duration={timerDuration}
        isPaused={isTimerPaused}
        onTimeUp={handleTimeUp}
        onTick={setTimeLeft}
      />
      <div className="flex-grow flex flex-col">
        <main className="flex-grow flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-8 p-4 overflow-hidden">
          <ImageFrame 
            imageUrl={imageUrl} 
            isLoading={gameState === GameState.GENERATING} 
            error={imageError}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
          {gameState === GameState.IDLE ? (
            <div className="flex flex-col items-center justify-center p-8 bg-amber-100/10 rounded-lg border-2 border-dashed border-amber-400/50 w-full max-w-md h-full max-h-[50vh] md:max-h-full md:h-auto">
              <h2 className="text-2xl text-amber-200 mb-4">Ready, {teamId}?</h2>
              <button 
                onClick={handleStartAfterInstructions}
                className="px-8 py-4 bg-amber-500 text-stone-900 font-bold text-xl rounded-md hover:bg-amber-400 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Start Round
              </button>
            </div>
          ) : (
            <PromptInput
              prompt={currentPrompt}
              setPrompt={setCurrentPrompt}
              onNextClue={handleNextClue}
              isGenerating={gameState === GameState.GENERATING}
              isFinished={gameState === GameState.FINISHED}
            />
          )}
        </main>
        
        {/* Correct Guess Button - Moved here from PromptInput */}
        {gameState !== GameState.IDLE && gameState !== GameState.FINISHED && (
          <div className="w-full flex justify-center p-4">
            <button 
              onClick={handleCorrectGuess}
              className="px-6 py-3 bg-amber-500 text-stone-900 font-bold text-lg rounded-md hover:bg-amber-400 transition-colors disabled:bg-amber-300/50 disabled:cursor-not-allowed"
            >
              ✅ Correct Guess
            </button>
          </div>
        )}
      </div>
      
      {roundStats && <ScorePopup stats={roundStats} onNextRound={handleNextRound} />}
      <Footer />
    </div>
  );
};

export default GameScreen;