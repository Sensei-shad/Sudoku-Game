import React from 'react';
import { Star, Trophy, Target, Lock } from 'lucide-react';
import { SudokuDifficulty, SudokuLevel } from '../types/sudoku';

interface LevelSelectProps {
  difficulties: (SudokuDifficulty & { levels: (SudokuLevel & { isLocked: boolean })[] })[];
  onSelectLevel: (level: SudokuLevel) => void;
  isLocked: (index: number) => boolean;
}

const LevelSelect: React.FC<LevelSelectProps> = ({ difficulties, onSelectLevel, isLocked }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">
          Select Your Challenge
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {difficulties.map((difficulty, index) => (
            <div key={difficulty.name} className={`space-y-4 ${!isLocked(index) ? 'opacity-50' : ''}`}>
              <div className="flex items-center gap-2 mb-4">
                {difficulty.name === 'Easy' && <Star className="w-6 h-6 text-yellow-400" />}
                {difficulty.name === 'Medium' && <Target className="w-6 h-6 text-blue-400" />}
                {difficulty.name === 'Hard' && <Trophy className="w-6 h-6 text-purple-400" />}
                <h3 className="text-xl font-bold text-white">{difficulty.name}</h3>
              </div>

              <div className="grid gap-3">
                {difficulty.levels.map((level) => (
                  <button
                    key={level.level}
                    onClick={() => onSelectLevel(level)}
                    disabled={level.isLocked || !isLocked(index)}
                    className={`
                      w-full p-4 rounded-xl backdrop-blur-lg
                      hover:transform hover:scale-105 transition-all duration-200
                      flex items-center justify-between
                      ${level.isLocked || !isLocked(index) 
                        ? 'bg-gray-400 bg-opacity-50 cursor-not-allowed' 
                        : 'bg-white bg-opacity-90 hover:bg-opacity-100'}
                    `}
                  >
                    <span className="font-semibold">Level {level.level}</span>
                    {(level.isLocked || !isLocked(index)) && <Lock className="w-4 h-4" />}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LevelSelect;