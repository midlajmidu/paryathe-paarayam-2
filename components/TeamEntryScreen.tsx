
import React, { useState } from 'react';

interface TeamEntryScreenProps {
  onTeamIdSubmit: (id: string) => void;
}

const TeamEntryScreen: React.FC<TeamEntryScreenProps> = ({ onTeamIdSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onTeamIdSubmit(inputValue.trim());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-stone-900">
        <div className="bg-stone-800 p-8 sm:p-12 rounded-lg shadow-2xl border-2 border-amber-400">
            <h1 className="text-4xl sm:text-6xl font-bold text-amber-300 mb-4 text-center" style={{ textShadow: '2px 2px 4px #000' }}>
                Parayathe Parayam
            </h1>
            <p className="text-amber-100 mb-8 text-center text-lg sm:text-xl font-typewriter">The Vintage Guessing Game</p>
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter Your Team ID"
                    className="w-full max-w-xs px-4 py-3 bg-amber-50 text-stone-800 border-2 border-amber-400 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-300 text-center font-serif text-lg"
                />
                <button
                    type="submit"
                    className="w-full max-w-xs px-6 py-3 bg-amber-500 text-stone-900 font-bold text-lg rounded-md hover:bg-amber-400 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                    Start Game
                </button>
            </form>
        </div>
    </div>
  );
};

export default TeamEntryScreen;
