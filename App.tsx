
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import useLocalStorage from './hooks/useLocalStorage';
import TeamEntryScreen from './components/TeamEntryScreen';
import GameScreen from './components/GameScreen';
import AdminScreen from './components/AdminScreen';

const App: React.FC = () => {
  const [teamId, setTeamId] = useState<string | null>(null);
  const [showInstructions, setShowInstructions] = useState(false);
  const [timerDuration, setTimerDuration] = useLocalStorage<number>('parayathe-parayam-timer', 150);

  const handleTeamIdSubmit = (id: string) => {
    if (id.trim()) {
      setTeamId(id.trim());
      setShowInstructions(true);
    }
  };

  const handleStartGame = () => {
    setShowInstructions(false);
  };

  return (
    <div className="bg-stone-900 text-amber-50 h-screen w-screen overflow-hidden">
      <HashRouter>
        <Routes>
          <Route
            path="/"
            element={
              teamId ? (
                <GameScreen 
                  teamId={teamId} 
                  timerDuration={timerDuration} 
                  showInstructions={showInstructions}
                  onStartGame={handleStartGame}
                />
              ) : (
                <TeamEntryScreen onTeamIdSubmit={handleTeamIdSubmit} />
              )
            }
          />
          <Route
            path="/admin"
            element={
              <AdminScreen
                initialDuration={timerDuration}
                setDuration={setTimerDuration}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </HashRouter>
    </div>
  );
};

export default App;
