import { SudokuLevel, SudokuDifficulty } from '../types/sudoku';

// Helper function to create a Sudoku puzzle
const createPuzzle = (solution: number[][], difficulty: number): number[][] => {
  const puzzle = solution.map(row => [...row]);
  const totalCells = 81;
  const cellsToRemove = Math.floor(totalCells * difficulty);
  
  let removed = 0;
  while (removed < cellsToRemove) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    if (puzzle[row][col] !== 0) {
      puzzle[row][col] = 0;
      removed++;
    }
  }
  return puzzle;
};

// Generate 40 levels with increasing difficulty
const generateLevels = (): SudokuLevel[] => {
  const levels: SudokuLevel[] = [];
  
  // Sample solutions for variety (you would want more variety in a real game)
  const solutions = [
    // Solution 1 (for levels 1-10)
    [
    [5,3,4,6,7,8,9,1,2],
    [6,7,2,1,9,5,3,4,8],
    [1,9,8,3,4,2,5,6,7],
    [8,5,9,7,6,1,4,2,3],
    [4,2,6,8,5,3,7,9,1],
    [7,1,3,9,2,4,8,5,6],
    [9,6,1,5,3,7,2,8,4],
    [2,8,7,4,1,9,6,3,5],
    [3,4,5,2,8,6,1,7,9]
  ],
  // Solution 2
  [
    [1,4,7,2,5,8,3,6,9],
    [2,5,8,3,6,9,4,7,1],
    [3,6,9,4,7,1,5,8,2],
    [4,7,1,5,8,2,6,9,3],
    [5,8,2,6,9,3,7,1,4],
    [6,9,3,7,1,4,8,2,5],
    [7,1,4,8,2,5,9,3,6],
    [8,2,5,9,3,6,1,4,7],
    [9,3,6,1,4,7,2,5,8]
  ],
  // Solution 3
  [
    [2,9,5,7,4,3,8,6,1],
    [4,3,1,8,6,5,9,2,7],
    [8,7,6,1,9,2,5,4,3],
    [3,8,7,4,5,9,2,1,6],
    [6,1,2,3,8,7,4,9,5],
    [5,4,9,2,1,6,7,3,8],
    [7,6,3,5,2,4,1,8,9],
    [9,2,8,6,7,1,3,5,4],
    [1,5,4,9,3,8,6,7,2]
  ],
  // Solution 4
  [
    [7,3,5,6,1,4,8,9,2],
    [8,4,2,9,7,3,5,6,1],
    [9,6,1,2,8,5,3,7,4],
    [2,8,6,3,4,9,1,5,7],
    [4,1,3,8,5,7,9,2,6],
    [5,7,9,1,2,6,4,3,8],
    [1,5,7,4,9,2,6,8,3],
    [6,9,4,7,3,8,2,1,5],
    [3,2,8,5,6,1,7,4,9]
  ],
  // Solution 5
  [
    [4,8,3,9,2,1,6,5,7],
    [9,6,7,3,4,5,8,2,1],
    [2,5,1,8,7,6,4,9,3],
    [5,4,8,1,3,2,9,7,6],
    [7,2,9,5,6,4,1,3,8],
    [1,3,6,7,9,8,2,4,5],
    [3,7,2,6,8,9,5,1,4],
    [8,1,4,2,5,3,7,6,9],
    [6,9,5,4,1,7,3,8,2]
  ],
  // Solution 6
  [
    [8,1,2,7,5,3,6,4,9],
    [9,4,3,6,8,2,1,7,5],
    [6,7,5,4,9,1,2,8,3],
    [1,5,4,2,3,7,8,9,6],
    [3,6,9,8,4,5,7,2,1],
    [2,8,7,1,6,9,5,3,4],
    [5,2,1,9,7,4,3,6,8],
    [4,3,8,5,2,6,9,1,7],
    [7,9,6,3,1,8,4,5,2]
  ],
  // Solution 7
  [
    [6,2,4,1,5,9,3,7,8],
    [5,1,9,8,3,7,2,4,6],
    [8,3,7,2,4,6,5,1,9],
    [1,4,3,6,7,5,8,9,2],
    [9,7,5,3,2,8,6,4,1],
    [2,8,6,9,1,4,7,5,3],
    [3,6,1,4,8,2,9,5,7],
    [4,5,2,7,9,1,8,6,3],
    [7,9,8,5,6,3,1,2,4]
  ],
  // Solution 8
  [
    [9,5,7,6,1,3,2,8,4],
    [4,8,3,2,5,7,1,9,6],
    [6,1,2,8,4,9,5,3,7],
    [1,7,8,3,2,4,9,6,5],
    [5,2,4,9,7,6,3,1,8],
    [3,6,9,1,8,5,4,7,2],
    [8,4,5,7,9,2,6,1,3],
    [2,9,1,5,3,8,7,4,6],
    [7,3,6,4,6,1,8,5,9]
  ],
  // Solution 9
  [
    [3,1,6,5,7,8,4,9,2],
    [5,2,9,1,3,4,7,6,8],
    [4,8,7,6,2,9,5,3,1],
    [2,6,3,4,1,5,9,8,7],
    [9,7,4,8,6,3,1,2,5],
    [8,5,1,7,9,2,6,4,3],
    [1,3,8,9,4,7,2,5,6],
    [6,9,2,3,5,1,8,7,4],
    [7,4,5,2,8,6,3,1,9]
  ],
  // Solution 10
  [
    [1,5,4,8,7,3,2,9,6],
    [3,8,6,2,9,4,7,1,5],
    [7,2,9,5,6,1,4,8,3],
    [8,6,3,7,2,5,1,4,9],
    [9,4,1,3,8,6,5,2,7],
    [2,7,5,1,4,9,8,6,3],
    [5,9,7,4,1,2,3,6,8],
    [4,3,2,6,5,8,9,7,1],
    [6,1,8,9,3,7,4,5,2]
  ],
    // Add more solution templates as needed
  ];

  // Generate 40 levels with increasing difficulty
  for (let i = 0; i < 40; i++) {
    const solutionTemplate = solutions[Math.floor(i / 20)];
    const difficulty = i < 10 ? 0.3 : i < 30 ? 0.5 : 0.7; // Adjust these values for desired difficulty
    
    levels.push({
      level: i + 1,
      puzzle: createPuzzle(solutionTemplate, difficulty),
      solution: solutionTemplate.map(row => [...row])
    });
  }

  return levels;
};

const allLevels = generateLevels();

export const difficulties: SudokuDifficulty[] = [
  {
    name: 'Easy',
    levels: allLevels.slice(0, 10),
    color: 'emerald'
  },
  {
    name: 'Medium',
    levels: allLevels.slice(10, 30),
    color: 'blue'
  },
  {
    name: 'Hard',
    levels: allLevels.slice(30),
    color: 'purple'
  }
];