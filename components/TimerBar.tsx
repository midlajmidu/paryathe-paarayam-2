import React, { useState, useEffect, useRef } from 'react';

interface TimerBarProps {
  duration: number;
  isPaused: boolean;
  onTimeUp: () => void;
  onTick: (timeLeft: number) => void;
}

const TimerBar: React.FC<TimerBarProps> = ({ duration, isPaused, onTimeUp, onTick }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  // FIX: Use ReturnType<typeof setInterval> for the ref type to be environment-agnostic.
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    onTick(timeLeft);
    if (isPaused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    if (timeLeft <= 0) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      onTimeUp();
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [timeLeft, isPaused, onTimeUp, onTick]);

  const percentage = (timeLeft / duration) * 100;
  const barColor = timeLeft <= 15 ? 'bg-red-500' : 'bg-amber-400';

  return (
    <div className="w-full bg-stone-700 h-8 shadow-inner relative">
      <div
        className={`h-full transition-all duration-500 ease-linear ${barColor}`}
        style={{ width: `${percentage}%` }}
      ></div>
      <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-white" style={{textShadow: '1px 1px 2px black'}}>
        {timeLeft}s
      </span>
    </div>
  );
};

export default TimerBar;
