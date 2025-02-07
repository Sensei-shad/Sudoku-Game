import React, { useState, useCallback } from 'react';
import { ArrowLeft } from 'lucide-react';
import { SudokuLevel } from '../types/sudoku';
import SudokuBoard from './SudokuBoard';
import CompletionModal from './CompletionModal';

interface GameScreenProps {
  level: SudokuLevel;
  onBack: () => void;
  onComplete: () => void;
  onNextLevel: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ level, onBack, onComplete, onNextLevel }) => {
  const [currentPuzzle, setCurrentPuzzle] = useState(
    level.puzzle.map(row => [...row])
  );
  const [isComplete, setIsComplete] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  const isValid = useCallback((row: number, col: number, value: number) => {
    // Check row
    for (let i = 0; i < 9; i++) {
      if (i !== col && currentPuzzle[row][i] === value) return false;
    }

    // Check column
    for (let i = 0; i < 9; i++) {
      if (i !== row && currentPuzzle[i][col] === value) return false;
    }

    // Check 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = boxRow; i < boxRow + 3; i++) {
      for (let j = boxCol; j < boxCol + 3; j++) {
        if (i !== row && j !== col && currentPuzzle[i][j] === value) return false;
      }
    }

    return true;
  }, [currentPuzzle]);

  const handleCellChange = (row: number, col: number, value: number) => {
    const newPuzzle = currentPuzzle.map(r => [...r]);
    newPuzzle[row][col] = value;
    setCurrentPuzzle(newPuzzle);

    // Check if puzzle is complete
    const complete = newPuzzle.every((row, i) =>
      row.every((cell, j) => cell === level.solution[i][j])
    );

    if (complete && !isComplete) {
      setIsComplete(true);
      setShowCompletionModal(true);
      onComplete();
    }
  };

  const handleNextLevel = () => {
    setShowCompletionModal(false);
    onNextLevel();
  };

  return (
    <div className="p-6">
      <div className="max-w-lg mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Levels
        </button>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Level {level.level}</h2>
          <p className="text-gray-600">
            Fill in the numbers from 1-9, ensuring no repeats in rows, columns, or 3x3 boxes
          </p>
        </div>

        <SudokuBoard
          puzzle={currentPuzzle}
          onCellChange={handleCellChange}
          isValid={isValid}
        />

        {showCompletionModal && (
          <CompletionModal
            level={level.level}
            onNextLevel={handleNextLevel}
          />
        )}
      </div>
    </div>
  );
};

export default GameScreen;