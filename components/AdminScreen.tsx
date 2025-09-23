
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface AdminScreenProps {
  initialDuration: number;
  setDuration: (duration: number) => void;
}

const AdminScreen: React.FC<AdminScreenProps> = ({ initialDuration, setDuration }) => {
  const [newDuration, setNewDuration] = useState(initialDuration.toString());
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const duration = parseInt(newDuration, 10);
    if (!isNaN(duration) && duration > 0) {
      setDuration(duration);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-4 bg-stone-800">
      <div className="w-full max-w-md bg-stone-900 p-8 rounded-lg shadow-2xl border-2 border-amber-400">
        <h1 className="text-4xl font-bold text-amber-300 mb-6 text-center">Admin Panel</h1>
        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label htmlFor="timer-duration" className="block text-lg text-amber-100 mb-2 font-typewriter">
              Round Timer Duration (seconds)
            </label>
            <input
              id="timer-duration"
              type="number"
              value={newDuration}
              onChange={(e) => setNewDuration(e.target.value)}
              min="1"
              className="w-full px-4 py-3 bg-amber-50 text-stone-800 border-2 border-amber-400 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-300 text-lg"
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <button
              type="submit"
              className="w-full px-6 py-3 bg-amber-500 text-stone-900 font-bold text-lg rounded-md hover:bg-amber-400 transition-all duration-300 transform hover:scale-105"
            >
              {saved ? 'Saved!' : 'Save Settings'}
            </button>
            <Link to="/" className="w-full text-center px-6 py-3 bg-stone-600 text-amber-50 font-bold text-lg rounded-md hover:bg-stone-500 transition-all duration-300">
              Back to Game
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminScreen;
