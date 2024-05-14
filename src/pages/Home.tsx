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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Select a Quiz</h1>
      <div className="grid grid-cols-2 gap-4">
        {quizzes.map((quiz) => (
          <button
            key={quiz.title}
            onClick={() => handleSelect(quiz.title)}
            className="flex items-center justify-center p-4 border rounded hover:bg-gray-200"
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
