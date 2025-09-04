import React from 'react';
import { Link } from 'react-router-dom';

const Puzzle = () => {
  return (
    <div className="app-container">
      <div className="game-wrapper max-sm:mt-10 bg-gradient-to-br from-m-cambridge-blue-30 to-m-cambridge-blue-80 backdrop-blur-sm shadow-xl min-h-[60vh] flex flex-col justify-center items-center text-center px-6">
        <header className="mb-8">
          <h1 className="text-4xl text-[var(--m-blue-green)] font-semibold">Puzzle Game Coming Soon 🧩</h1>
          <p className="text-xl text-gray-400 font-medium mt-4">
            We're working on a fun new puzzle game for curious little minds. Stay tuned!
          </p>
        </header>

        <Link
          to="/games"
          className="mt-6 bg-gradient-to-br from-m-cambridge-blue-30 to-m-cambridge-blue-80 hover:bg-[var(--m-blue-green)] text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all"
        >
          Back to Games
        </Link>
      </div>
    </div>
  );
};

export default Puzzle;
