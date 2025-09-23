
import React from 'react';

interface PromptInputProps {
  prompt: string;
  setPrompt: (p: string) => void;
  onNextClue: () => void;
  onCorrectGuess: () => void;
  isGenerating: boolean;
  isFinished: boolean;
}

const PromptInput: React.FC<PromptInputProps> = ({ prompt, setPrompt, onNextClue, onCorrectGuess, isGenerating, isFinished }) => {
  const isDisabled = isGenerating || isFinished;

  return (
    <div 
        className="w-full max-w-md h-full max-h-[50vh] md:max-h-full md:h-auto p-6 bg-amber-50 rounded-lg shadow-lg flex flex-col justify-between border-4 border-amber-800/50 font-typewriter" 
        style={{ background: '#fdf5e6' }}
    >
      <div className="flex-grow flex flex-col">
        <label htmlFor="prompt-input" className="text-xl text-stone-700 mb-2">
          Player 1: Your Secret Prompt
        </label>
        <textarea
          id="prompt-input"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., 'a cat playing a tiny piano'"
          disabled={isDisabled}
          className="w-full flex-grow p-3 bg-transparent text-stone-800 border-2 border-stone-400/50 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600 resize-none text-lg"
        />
      </div>
      <div className="mt-4 flex flex-col sm:flex-row gap-4">
        <button
          onClick={onNextClue}
          disabled={isDisabled || !prompt.trim()}
          className="flex-1 px-4 py-3 bg-stone-700 text-amber-50 font-bold text-lg rounded-md hover:bg-stone-600 transition-colors disabled:bg-stone-400 disabled:cursor-not-allowed"
        >
          {isGenerating ? 'Generating...' : 'Next Clue'}
        </button>
        <button
          onClick={onCorrectGuess}
          disabled={isDisabled}
          className="flex-1 px-4 py-3 bg-amber-500 text-stone-900 font-bold text-lg rounded-md hover:bg-amber-400 transition-colors disabled:bg-amber-300/50 disabled:cursor-not-allowed"
        >
          ✅ Correct Guess
        </button>
      </div>
    </div>
  );
};

export default PromptInput;
