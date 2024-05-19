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
    <div className="grid md:grid-cols-2 p-8">
      <div className="text-2xl font-bold mb-4 dark:text-yellow-500">Welcome to the Frontend Quiz! Pick a subject to get started</div>
      <div className="grid gap-4">
        {quizzes.map((quiz) => (
          <button
            key={quiz.title}
            onClick={() => handleSelect(quiz.title)}
            className="flex items-center justify-center p-4 border rounded-md bg-white dark:bg-darkbutton shadow"
          >
            <img src={quiz.icon} alt={quiz.title} className="w-12 h-12 mr-2" />
            <span>{quiz.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
