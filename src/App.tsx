import React, { useState, useEffect } from 'react';
import { TowerControl as GameController, Brain } from 'lucide-react';
import WelcomeScreen from './components/WelcomeScreen';
import LevelSelect from './components/LevelSelect';
import GameScreen from './components/GameScreen';
import { difficulties } from './data/sudokuLevels';
import { SudokuLevel, GameProgress } from './types/sudoku';

function App() {
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'levels' | 'game'>('welcome');
  const [selectedLevel, setSelectedLevel] = useState<SudokuLevel | null>(null);
  const [gameProgress, setGameProgress] = useState<GameProgress>(() => {
    const saved = localStorage.getItem('sudokuProgress');
    return saved ? JSON.parse(saved) : { completedLevels: [], currentLevel: 1 };
  });

  useEffect(() => {
    localStorage.setItem('sudokuProgress', JSON.stringify(gameProgress));
  }, [gameProgress]);

  const isLevelUnlocked = (level: number) => {
    if (level <= 1) return true;
    return gameProgress.completedLevels.includes(level - 1);
  };

  const isDifficultyUnlocked = (difficultyIndex: number) => {
    if (difficultyIndex === 0) return true;
    
    const previousDifficulty = difficulties[difficultyIndex - 1];
    return previousDifficulty.levels.every(level => 
      gameProgress.completedLevels.includes(level.level)
    );
  };

  const handleLevelComplete = (level: number) => {
    if (!gameProgress.completedLevels.includes(level)) {
      setGameProgress(prev => ({
        ...prev,
        completedLevels: [...prev.completedLevels, level],
        currentLevel: level + 1
      }));
    }
  };

  const handleLevelSelect = (level: SudokuLevel) => {
    if (!isLevelUnlocked(level.level)) {
      alert('Complete the previous level first!');
      return;
    }
    setSelectedLevel(level);
    setCurrentScreen('game');
  };

  const handleNextLevel = () => {
    const nextLevel = selectedLevel ? selectedLevel.level + 1 : 1;
    const nextLevelData = difficulties.flatMap(d => d.levels).find(l => l.level === nextLevel);
    if (nextLevelData && isLevelUnlocked(nextLevel)) {
      setSelectedLevel(nextLevelData);
    } else {
      setCurrentScreen('levels');
      setSelectedLevel(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-blue-300">
      {currentScreen === 'welcome' && (
        <WelcomeScreen onStart={() => setCurrentScreen('levels')} />
      )}
      {currentScreen === 'levels' && (
        <LevelSelect 
          difficulties={difficulties.map((diff, index) => ({
            ...diff,
            levels: diff.levels.map(level => ({
              ...level,
              isLocked: !isLevelUnlocked(level.level)
            }))
          }))}
          onSelectLevel={handleLevelSelect}
          isLocked={isDifficultyUnlocked} // Fixed: Pass the function directly
        />
      )}
      {currentScreen === 'game' && selectedLevel && (
        <GameScreen
          level={selectedLevel}
          onBack={() => setCurrentScreen('levels')}
          onComplete={() => handleLevelComplete(selectedLevel.level)}
          onNextLevel={handleNextLevel}
        />
      )}
    </div>
  );
}

export default App;