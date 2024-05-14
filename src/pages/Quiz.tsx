// src/pages/Quiz.tsx
import React, { useState } from 'react';
import { useQuiz } from '../context/QuizContext';

const Quiz: React.FC = () => {
  const { currentQuiz, score, setScore } = useQuiz();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);

  if (!currentQuiz) {
    return <div>No quiz selected.</div>;
  }

  const questions = currentQuiz.questions;

  const handleAnswer = () => {
    if (selectedOption === null) {
      setShowError(true);
      return;
    }

    setShowError(false);

    if (selectedOption === questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      setQuizCompleted(true);
    }
  };

  const handlePlayAgain = () => {
    setCurrentQuestionIndex(0);
    setQuizCompleted(false);
    setScore(0);
    setSelectedOption(null);
  };

  return (
    <div className="p-4">
      {!quizCompleted ? (
        <div>
          <h2 className="text-xl font-bold mb-4">{questions[currentQuestionIndex].question}</h2>
          {questions[currentQuestionIndex].options.map((option, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`option-${index}`}
                name="option"
                value={option}
                checked={selectedOption === option}
                onChange={() => setSelectedOption(option)}
              />
              <label htmlFor={`option-${index}`}>{option}</label>
            </div>
          ))}
          {showError && <div className="text-red-500">Please select an option.</div>}
          <button onClick={handleAnswer} className="mt-4 p-2 bg-blue-500 text-white rounded">
            Submit Answer
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-bold mb-4">Quiz Completed</h2>
          <p>Your score: {score} / {questions.length}</p>
          <button onClick={handlePlayAgain} className="mt-4 p-2 bg-blue-500 text-white rounded">
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
