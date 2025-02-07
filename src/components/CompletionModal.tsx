import React from 'react';
import { Trophy, ArrowRight } from 'lucide-react';

interface CompletionModalProps {
  level: number;
  onNextLevel: () => void;
}

const CompletionModal: React.FC<CompletionModalProps> = ({ level, onNextLevel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 transform animate-bounce-in">
        <div className="text-center">
          <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-2 text-gray-800">
            Congratulations! 🎉
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            You've completed Level {level}!
          </p>
          <button
            onClick={onNextLevel}
            className="inline-flex items-center justify-center px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105"
          >
            Next Level
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompletionModal;