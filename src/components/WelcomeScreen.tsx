import React from 'react';
import { TowerControl as GameController, Brain } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white bg-opacity-90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-transform duration-300 w-full max-w-md">
        <div className="text-center">
          <div className="flex justify-center gap-4 mb-6">
            <GameController className="w-12 h-12 text-purple-500 animate-bounce" />
            <Brain className="w-12 h-12 text-pink-500 animate-bounce delay-100" />
          </div>
          
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Sudoku Fun!
          </h1>
          
          <p className="text-gray-600 mb-8">
            Challenge your mind with our cartoonish Sudoku adventure!
          </p>

          <button
            onClick={onStart}
            className="group relative inline-flex items-center justify-center px-8 py-3 font-bold text-white transition-all duration-200 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            <span className="relative">Start Playing!</span>
            <GameController className="w-5 h-5 ml-2 group-hover:animate-bounce" />
          </button>

          <div className="mt-8 space-y-2 text-sm text-gray-500">
            <p>🎮 Multiple difficulty levels</p>
            <p>🎨 Fun cartoonish design</p>
            <p>🧩 Challenging puzzles</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;