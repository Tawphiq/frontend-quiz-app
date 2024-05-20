// src/pages/Home.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import SubjectCard from '../components/SubjectCard';

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
          <SubjectCard
            key={quiz.title}
            title={quiz.title}
            icon={quiz.icon}
            iconbg={quiz.iconbg}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;

