// src/pages/Home.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { quizzes, setSubject } = useQuiz();

  const handleSelect = (subject: string) => {
    setSubject(subject);
    navigate('/quiz');
  };


  return (
    <div className="grid lg:grid-cols-2 p-8 md:p-20 lg:px-40">
      <div className="text-2xl font-bold mb-4 p-4 text-dark dark:text-white">
        <p className='font-thin text-4xl md:text-6xl lg:text-5xl'>Welcome to the</p>
        <p className='font-bold text-4xl md:text-6xl lg:text-5xl mb-2 md:mb-5 lg:mb-10'>Frontend Quiz!</p>
        <i className='font-thin text-sm md:text-2xl text-darkthin dark:text-thinlight'>Pick a subject to get started</i>
      </div>
      <div className="grid gap-4 md:mt-10 lg:mt-0">
        {quizzes.map((quiz) => (
          <button
            key={quiz.title}
            onClick={() => handleSelect(quiz.title)}
            className="flex items-center lg:text-2xl p-4 rounded-2xl bg-white dark:bg-dark shadow"
          >
            <div className={`md:w-12 md:h-12 p-1 grid justify-center items-center rounded-lg mr-5 ${
              quiz.title === "HTML"?'bg-orange-100'
              : quiz.title === "CSS"? 'bg-green-100'
              : quiz.title === "JavaScript"?'bg-blue-100'
              : 'bg-fuchsia-100'
              } `}>
            <img src={quiz.icon} alt={quiz.title} className="w-6 h-6" />
            </div>
            <span className='font-bold text-dark dark:text-white'>{quiz.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;


