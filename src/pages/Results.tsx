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
    <div className="p-2 lg:p-0 lg:grid lg:grid-cols-2">
      <div>
      <h2 className="font-thin text-dark dark:white text-4xl md:text-6xl lg:text-7xl">Quiz Completed</h2>
      <h1 className='font-bold text-dark dark:text-white text-4xl md:text-6xl lg:text-7xl mb-8'>You scored...</h1>
      </div>
      {currentQuiz && (<div className='lg:mx-14'>
      <div className='bg-white dark:bg-dark p-5 rounded-lg shadow '>
      <div className='flex justify-center gap-2'>
      <img src={currentQuiz.icon} alt="" />
      <span className='grid items-center font-bold text-dark dark:text-white text-xl md:text-2xl'>{currentQuiz.title}</span>
      </div>
      <p className='grid justify-center text-6xl lg:text-9xl text-dark dark:text-white my-4 lg:my-8'>{score}</p>
      <p className='grid justify-center text-dark dark:text-white'>out of {totalQuestions}</p>
      </div>
      <button onClick={handlePlayAgain} className="mt-4 h-20 p-2 bg-purple text-white md:text-2xl rounded-2xl w-full hover:bg-fuchsia-400">
        Play Again
      </button>
      </div>)}
    </div>
  );
};

export default Results;
