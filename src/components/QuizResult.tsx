// src/components/QuizResult.tsx
import React from 'react';

interface QuizResultProps {
  score: number;
  totalQuestions: number;
  onPlayAgain: () => void;
}

const QuizResult: React.FC<QuizResultProps> = ({ score, totalQuestions, onPlayAgain }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Quiz Completed</h2>
      <p>Your score: {score} / {totalQuestions}</p>
      <button onClick={onPlayAgain} className="mt-4 p-2 bg-blue-500 text-white rounded">
        Play Again
      </button>
    </div>
  );
};

export default QuizResult;
