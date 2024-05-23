// src/pages/Quiz.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import ProgressBar from '../components/ProgressBar';
import correctIcon from '../assets/images/icon-correct.svg';
import incorrectIcon from '../assets/images/icon-incorrect.svg';
import errorIcon from '../assets/images/icon-error.svg';

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
    <div className="p-4 max-w-5xl mx-auto">
      {!quizCompleted ? (
        <div className="lg:flex lg:gap-8">
          <div className="lg:w-1/2">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-center lg:text-left">
              Question {currentQuestionIndex + 1} of {questions.length}
            </h2>
            <h3 className="text-lg md:text-xl font-semibold mb-4 text-center lg:text-left">
              {questions[currentQuestionIndex].question}
            </h3>
            <ProgressBar totalQuestions={questions.length} currentQuestionIndex={currentQuestionIndex} />
          </div>
          <div className="lg:w-1/2">
            <div className="flex flex-col items-start">
              {questions[currentQuestionIndex].options.map((option, index) => {
                const label = String.fromCharCode(65 + index); // Convert index to letter (A, B, C, ...)
                const isCorrect = showAnswer && option === questions[currentQuestionIndex].answer;
                const isSelected = selectedOption === option;
                const isSelectedAndIncorrect = showAnswer && isSelected && !isCorrect;
                return (
                  <button
                    key={index}
                    onClick={() => !showAnswer && setSelectedOption(option)}
                    className={`p-2 border rounded w-full text-left mb-2 flex justify-between items-center ${
                      showAnswer
                        ? isCorrect
                          ? 'border-green-500'
                          : isSelectedAndIncorrect
                          ? 'border-red-500'
                          : 'border-gray-300'
                        : isSelected
                        ? 'bg-blue-500 text-white'
                        : 'border-gray-300'
                    }`}
                    disabled={showAnswer}
                  >
                    <span>
                      <span className="mr-2">{label}.</span> {option}
                    </span>
                    {showAnswer && isSelected && (
                      <img
                        src={isCorrect ? correctIcon : incorrectIcon}
                        alt={isCorrect ? 'Correct' : 'Incorrect'}
                        className="w-5 h-5"
                      />
                    )}
                  </button>
                );
              })}
            </div>
            {showError && <div className="text-red-500 border-2 w-full">Please select an option <span><img src={errorIcon} alt="" /></span></div>}
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
