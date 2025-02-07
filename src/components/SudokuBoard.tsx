import React, { useState, useEffect } from 'react';
import { SudokuGrid, CellPosition } from '../types/sudoku';

interface SudokuBoardProps {
  puzzle: SudokuGrid;
  onCellChange: (row: number, col: number, value: number) => void;
  isValid: (row: number, col: number, value: number) => boolean;
}

const SudokuBoard: React.FC<SudokuBoardProps> = ({ puzzle, onCellChange, isValid }) => {
  const [selectedCell, setSelectedCell] = useState<CellPosition | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [inputMode, setInputMode] = useState<'keyboard' | 'numpad'>('keyboard');

  const handleCellClick = (row: number, col: number) => {
    // Don't allow selecting cells that are part of the original puzzle
    if (puzzle[row][col] !== 0) return;
    setSelectedCell({ row, col });
    setError(null);
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (!selectedCell) return;

    const num = parseInt(e.key);
    if (isNaN(num) || num < 1 || num > 9) return;

    const { row, col } = selectedCell;
    if (puzzle[row][col] !== 0) return;

    if (isValid(row, col, num)) {
      onCellChange(row, col, num);
      setError(null);
    } else {
      setError('Invalid move! This number already exists in the row, column, or box.');
    }
  };

  const handleNumpadClick = (num: number) => {
    if (!selectedCell) return;

    const { row, col } = selectedCell;
    if (puzzle[row][col] !== 0) return;

    if (isValid(row, col, num)) {
      onCellChange(row, col, num);
      setError(null);
    } else {
      setError('Invalid move! This number already exists in the row, column, or box.');
    }
  };

  useEffect(() => {
    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [selectedCell]);

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="grid grid-cols-9 gap-0.5 bg-gray-300 p-0.5 rounded-lg shadow-lg">
        {puzzle.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const isSelected = selectedCell?.row === rowIndex && selectedCell?.col === colIndex;
            const isOriginal = puzzle[rowIndex][colIndex] !== 0;
            const boxStartRow = Math.floor(rowIndex / 3) * 3;
            const boxStartCol = Math.floor(colIndex / 3) * 3;
            const isInSelectedBox = selectedCell && 
              Math.floor(selectedCell.row / 3) === Math.floor(rowIndex / 3) &&
              Math.floor(selectedCell.col / 3) === Math.floor(colIndex / 3);

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`
                  aspect-square flex items-center justify-center
                  text-xl font-semibold cursor-pointer transition-all
                  ${isSelected ? 'bg-blue-200' : isInSelectedBox ? 'bg-blue-50' : 'bg-white'}
                  ${isOriginal ? 'text-gray-800 font-bold' : 'text-blue-600'}
                  ${rowIndex % 3 === 0 && 'border-t-2 border-gray-800'}
                  ${colIndex % 3 === 0 && 'border-l-2 border-gray-800'}
                  ${rowIndex === 8 && 'border-b-2 border-gray-800'}
                  ${colIndex === 8 && 'border-r-2 border-gray-800'}
                  hover:bg-blue-100
                `}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                {cell !== 0 ? cell : ''}
              </div>
            );
          })
        )}
      </div>

      {/* Number Pad */}
      <div className="mt-8 grid grid-cols-3 gap-2 max-w-xs mx-auto">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => handleNumpadClick(num)}
            className="p-4 text-xl font-bold bg-white rounded-lg shadow hover:bg-blue-50 transition-colors"
          >
            {num}
          </button>
        ))}
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-center">
          {error}
        </div>
      )}
    </div>
  );
};

export default SudokuBoard;