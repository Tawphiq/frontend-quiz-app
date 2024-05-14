// src/context/QuizContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import quizzes from '../data/data.json';

interface Question {
  question: string;
  options: string[];
  answer: string;
}

interface Quiz {
  title: string;
  icon: string;
  questions: Question[];
}

interface QuizContextType {
  subject: string;
  quizzes: Quiz[];
  currentQuiz: Quiz | null;
  score: number;
  setSubject: (subject: string) => void;
  setScore: (score: number) => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [subject, setSubject] = useState<string>('');
  const [score, setScore] = useState<number>(0);

  const currentQuiz = quizzes.quizzes.find((quiz) => quiz.title === subject) || null;

  return (
    <QuizContext.Provider value={{ subject, quizzes: quizzes.quizzes, currentQuiz, score, setSubject, setScore }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = (): QuizContextType => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};
