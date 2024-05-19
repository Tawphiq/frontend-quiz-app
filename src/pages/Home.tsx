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
      <div className="text-2xl font-bold mb-4 p-4 dark:text-white">
        <p>Welcome to the</p>
        <p>Frontend Quiz!</p>
        <p>Pick a subject to get started</p>
      </div>
      <div className="grid gap-4">
        {quizzes.map((quiz) => (
          <button
            key={quiz.title}
            onClick={() => handleSelect(quiz.title)}
            className="flex items-center p-4  rounded-2xl bg-white dark:bg-darkbutton shadow"
          >
            <div className={`w-12 h-12 grid justify-center items-center rounded-lg mr-2 $`}>
            <img src={quiz.icon} alt={quiz.title} className="w-6 h-6" />
            </div>
            <span>{quiz.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
