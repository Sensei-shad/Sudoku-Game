export type SudokuGrid = number[][];

export interface SudokuLevel {
  level: number;
  puzzle: SudokuGrid;
  solution: SudokuGrid;
}

export interface SudokuDifficulty {
  name: string;
  levels: SudokuLevel[];
  color: string;
}

export interface CellPosition {
  row: number;
  col: number;
}

export interface GameProgress {
  completedLevels: number[];
  currentLevel: number;
}