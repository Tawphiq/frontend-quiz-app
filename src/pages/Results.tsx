// src/pages/Results.tsx
import React from 'react';
import { useQuiz } from '../context/QuizContext';

interface ResultsProps {
  score: number;
  totalQuestions: number;
  handlePlayAgain: () => void;
}

const Results: React.FC<ResultsProps> = ({ score, totalQuestions, handlePlayAgain }) => {
  const { currentQuiz } = useQuiz();


  return (
    <div className="text-center">
      <div>
      <h2 className="text-xl md:text-2xl">Quiz Completed</h2>
      <h1 className='mb-4'>You scored...</h1>
      </div>
      {currentQuiz && (<div>
      <div className='flex justify-center gap-2'>
      <img src={currentQuiz.icon} alt="" />
      <span className='flex items-center'>{currentQuiz.title}</span>
      </div>
      <p>{score} out of {totalQuestions}</p>
      <button onClick={handlePlayAgain} className="mt-4 p-2 bg-purple text-white rounded w-full md:w-auto">
        Play Again
      </button>
      </div>)}
    </div>
  );
};

export default Results;
