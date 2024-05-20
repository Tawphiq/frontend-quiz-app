// src/pages/Quiz.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import ProgressBar from '../components/ProgressBar';

const Quiz: React.FC = () => {
  const { currentQuiz, score, setScore } = useQuiz();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);

  const navigate = useNavigate();

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
    setShowAnswer(true);

    if (selectedOption === questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }

    setShowNextButton(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setShowAnswer(false);
      setShowNextButton(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handlePlayAgain = () => {
    setCurrentQuestionIndex(0);
    setQuizCompleted(false);
    setScore(0);
    setSelectedOption(null);
    setShowAnswer(false);
    setShowNextButton(false);
    navigate('/');
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      {!quizCompleted ? (
        <div className='grid lg:grid-cols-2'>
          <div>
          <h2 className="text-xl md:text-2xl font-bold mb-4">{questions[currentQuestionIndex].question}</h2>
          <ProgressBar totalQuestions={questions.length} currentQuestionIndex={currentQuestionIndex} />
          </div>
          <div>
          <div className="flex flex-col items-start">
            {questions[currentQuestionIndex].options.map((option, index) => (
              <button
                key={index}
                onClick={() => !showAnswer && setSelectedOption(option)}
                className={`p-4 rounded-2xl w-full text-left mb-2 bg-white dark:bg-dark shadow ${
                  showAnswer
                    ? option === questions[currentQuestionIndex].answer
                      ? 'border-green-500'
                      : selectedOption === option
                      ? 'border-red-500'
                      : 'border-gray-300'
                    : selectedOption === option
                    ? 'bg-blue-500 text-white'
                    : 'border-gray-300'
                }`}
                disabled={showAnswer}
              >
                {option}
              </button>
            ))}
          </div>
          {showError && <div className="text-red-500">Please select an option.</div>}
          {!showAnswer ? (
            <button onClick={handleAnswer} className="mt-4 p-2 bg-purple text-white rounded w-full md:w-auto">
              Submit Answer
            </button>
          ) : (
            <>
              {showNextButton && (
                <button onClick={handleNextQuestion} className="mt-4 p-2 bg-purple text-white rounded w-full md:w-auto">
                  Next Question
                </button>
              )}
            </>
          )}
        </div>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Quiz Completed</h2>
          <p>Your score: {score} / {questions.length}</p>
          <button onClick={handlePlayAgain} className="mt-4 p-2 bg-blue-500 text-white rounded w-full md:w-auto">
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;

