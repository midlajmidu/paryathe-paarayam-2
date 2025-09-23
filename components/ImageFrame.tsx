
import React from 'react';

interface ImageFrameProps {
  imageUrl: string | null;
  isLoading: boolean;
  error: string | null;
  onLoad: () => void;
  onError: () => void;
}

const ImageFrame: React.FC<ImageFrameProps> = ({ imageUrl, isLoading, error, onLoad, onError }) => {
  return (
    <div className="w-full max-w-lg p-4 bg-stone-900 border-4 border-amber-700 shadow-2xl rounded-sm">
      <div className="w-full aspect-square bg-stone-700 flex items-center justify-center border-2 border-amber-300 relative">
        {isLoading && (
          <div className="flex flex-col items-center justify-center text-amber-200">
            <svg className="animate-spin h-10 w-10 text-amber-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="mt-4 text-lg font-typewriter">Conjuring image...</p>
          </div>
        )}
        {error && !isLoading && (
            <div className="p-4 text-center text-red-400 font-typewriter">
                <p>Oops! The ether seems to be blocked.</p>
                <p>{error}</p>
            </div>
        )}
        {!isLoading && !imageUrl && !error && (
            <div className="text-center text-amber-300 p-4">
                <p className="text-2xl font-serif">Awaiting a vision...</p>
                <p className="mt-2 font-typewriter">Player 1, please provide a prompt.</p>
            </div>
        )}
        {imageUrl && (
            <img
            key={imageUrl}
            src={imageUrl}
            alt="AI generated visual clue"
            onLoad={onLoad}
            onError={onError}
            className={`object-contain w-full h-full transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            />
        )}
      </div>
      {imageUrl && !isLoading && (
        <div className="mt-4 flex justify-center">
          <button 
            onClick={() => {
              // This will be handled by the parent component
              const event = new Event('guessButtonClick');
              window.dispatchEvent(event);
            }}
            className="px-6 py-2 bg-amber-500 text-stone-900 font-bold rounded-md hover:bg-amber-400 transition-colors shadow-md"
          >
            Guess
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageFrame;
