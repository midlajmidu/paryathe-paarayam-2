
import React from 'react';

interface LogoProps {
    variant?: 'left' | 'right';
}

const Logo: React.FC<LogoProps> = ({ variant = 'left' }) => {
    const imageSrc = variant === 'left' 
        ? "/WhatsApp Image 2025-09-24 at 00.13.09.jpeg" 
        : "/WhatsApp Image 2025-09-24 at 00.13.10.jpeg";
        
    return (
        <div className="w-10 h-10 sm:w-14 sm:h-14 bg-amber-400 rounded-full flex items-center justify-center shadow-lg overflow-hidden">
            <img 
                src={imageSrc} 
                alt="Logo" 
                className="w-full h-full object-cover"
            />
        </div>
    );
};

const Header: React.FC = () => {
  return (
    <header className="w-full bg-stone-900 shadow-lg p-2 sm:p-3 z-10">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Logo variant="left" />
        <h1 className="text-2xl sm:text-4xl font-bold text-amber-300 text-center tracking-wider" style={{ textShadow: '1px 1px 3px #000' }}>
            Parayathe Parayam
        </h1>
        <Logo variant="right" />
      </div>
    </header>
  );
};

export default Header;
