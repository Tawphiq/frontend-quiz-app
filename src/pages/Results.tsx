// src/pages/Results.tsx
import React from 'react';

interface ResultsProps {
  score: number;
  totalQuestions: number;
  handlePlayAgain: () => void;
}

const Results: React.FC<ResultsProps> = ({ score, totalQuestions, handlePlayAgain }) => {


  return (
    <div className="text-center">
      <h2 className="text-xl md:text-2xl font-bold mb-4">Quiz Completed</h2>
      <p>Your score: {score} out of {totalQuestions}</p>
      <button onClick={handlePlayAgain} className="mt-4 p-2 bg-purple text-white rounded w-full md:w-auto">
        Play Again
      </button>
    </div>
  );
};

export default Results;
