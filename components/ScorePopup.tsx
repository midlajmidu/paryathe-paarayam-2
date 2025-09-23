
import React from 'react';
import { RoundStats } from '../types';

interface ScorePopupProps {
  stats: RoundStats;
  onNextRound: () => void;
}

const ScorePopup: React.FC<ScorePopupProps> = ({ stats, onNextRound }) => {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm p-4">
      <div className="bg-stone-800 text-amber-50 border-4 border-amber-400 rounded-lg shadow-2xl p-6 sm:p-10 max-w-lg w-full text-center animate-fade-in">
        <h2 className="text-3xl sm:text-4xl font-bold text-amber-300 mb-4">Round Over!</h2>
        <div className="space-y-4 text-lg sm:text-xl my-6 font-typewriter">
          <p><span className="font-bold text-amber-200">Team:</span> {stats.teamId}</p>
          <p><span className="font-bold text-amber-200">Time Remaining:</span> {stats.timeRemaining}s</p>
          <p><span className="font-bold text-amber-200">Prompts Used:</span> {stats.promptsUsed}</p>
        </div>
        <div className="my-6">
          <p className="text-2xl text-amber-100">Final Score</p>
          <p className="text-6xl font-bold text-amber-400 my-2">{stats.score}</p>
        </div>
        <button
          onClick={onNextRound}
          className="w-full max-w-xs px-6 py-3 mt-4 bg-amber-500 text-stone-900 font-bold text-lg rounded-md hover:bg-amber-400 transition-all duration-300 transform hover:scale-105"
        >
          Start Next Round
        </button>
      </div>
    </div>
  );
};

export default ScorePopup;
