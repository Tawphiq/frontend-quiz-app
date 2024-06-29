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
      <h2 className="font-thin text-[#3B4D66] dark:text-white text-4xl md:text-6xl lg:text-7xl">Quiz Completed</h2>
      <h1 className='font-bold text-[#3B4D66] dark:text-white text-4xl md:text-6xl lg:text-7xl mb-8'>You scored...</h1>
      </div>
      {currentQuiz && (<div className='lg:mx-14'>
      <div className='bg-white dark:bg-[#3B4D66] p-5 rounded-lg shadow '>
      <div className='flex justify-center gap-2'>
      <img src={currentQuiz.icon} alt="" className={`p-1 rounded w-10 h-10 ${
              currentQuiz.title === "HTML" ? 'bg-orange-100'
              : currentQuiz.title === "CSS" ? 'bg-teal-100'
              : currentQuiz.title === "JavaScript" ? 'bg-blue-100'
              : 'bg-fuchsia-100'
              }`} />
      <span className='grid items-center font-bold text-[#3B4D66] dark:text-white text-xl md:text-2xl'>{currentQuiz.title}</span>
      </div>
      <p className='grid justify-center text-6xl lg:text-9xl text-[#3B4D66] dark:text-white my-4 lg:my-8'>{score}</p>
      <p className='grid justify-center text-[#3B4D66] dark:text-white text-xl'>out of {totalQuestions}</p>
      </div>
      <button onClick={handlePlayAgain} className="mt-4 h-14 lg:h-20 p-2 bg-purple-500 text-white md:text-2xl rounded-2xl w-full hover:bg-fuchsia-400">
        Play Again
      </button>
      </div>)}
    </div>
  );
};

export default Results;
