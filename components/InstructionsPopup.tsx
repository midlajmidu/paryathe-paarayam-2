import React from 'react';

interface InstructionsPopupProps {
  onClose: () => void;
}

const InstructionsPopup: React.FC<InstructionsPopupProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto text-black">
        <h2 className="text-2xl font-bold mb-4 text-center">🎯 Game Instructions</h2>
        
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-2">Objective</h3>
            <p>Compete in 2 vs 2 battles – one prompts, one guesses. The faster you guess, the higher your score!</p>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-2">📋 How to Play</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Each round is 2 vs 2 (one prompter + one guesser per team).</li>
              <li>The opponent team decides the "thing" you must generate & guess.</li>
              <li>The prompter can use unlimited prompts to generate the image.</li>
              <li>The guesser must identify the correct thing from the image.</li>
              <li>Each round has a countdown timer.</li>
            </ul>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-2">⏱️ Scoring</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>The timer starts with a fixed time (e.g., 120s).</li>
              <li>Final Score = (Time Remaining × 2)</li>
              <li>Example: Time Remaining = 116s → Final Score = 232</li>
              <li>Faster guesses = higher points.</li>
              <li>The team with the most points qualifies for the next round.</li>
            </ul>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-2">🔑 Rules</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Only one member prompts; the other guesses.</li>
              <li>Topics change each round.</li>
              <li>No outside hints or cheating.</li>
              <li>Best score wins the round!</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 flex justify-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Got it, let's play! 🚀
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructionsPopup;
