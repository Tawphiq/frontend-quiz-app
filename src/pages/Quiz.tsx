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
    <div className="p-8 md:p-20 lg:px-40">
      {!quizCompleted ? (
        <div className="lg:flex lg:gap-20">
          <div className="lg:w-1/2">
            <i className="mb-4 text-center lg:text-left font-thin text-sm md:text-2xl text-darkthin dark:text-thinlight">
              Question {currentQuestionIndex + 1} of {questions.length}
            </i>
            <h3 className="text-start text-lg md:text-xl font-semibold mb-4 lg:mb-20 lg:text-left">
              {questions[currentQuestionIndex].question}
            </h3>
            <ProgressBar totalQuestions={questions.length} currentQuestionIndex={currentQuestionIndex} />
          </div>
          <div className="lg:w-1/2">
            <div className="flex flex-col items-start">
              {questions[currentQuestionIndex].options.map((option, index) => {
                const label = String.fromCharCode(65 + index); // Converting index to letter (A, B, C, ...)
                const isCorrect = showAnswer && option === questions[currentQuestionIndex].answer;
                const isSelected = selectedOption === option;
                const isSelectedAndIncorrect = showAnswer && isSelected && !isCorrect;
                return (
                  <button
                    key={index}
                    onClick={() => !showAnswer && setSelectedOption(option)}
                    className={`p-4 h-20 rounded-2xl shadow bg-white dark:bg-dark md:text-xl font-semibold text-dark dark:text-white w-full text-left mb-2 flex items-center ${
                      showAnswer
                        ? isCorrect
                          ? 'border-green-500 border-2'
                          : isSelectedAndIncorrect
                          ? 'border-red-500 border-2'
                          : 'border-gray-300'
                        : isSelected
                        ? 'border-purple border-2 dark:text-white'
                        : 'border-gray-300'
                    }`}
                    disabled={showAnswer}
                  >
                    <div className='md:w-12 md:h-12 p-1 grid justify-center items-center bg-gray-100 dark:text-dark mr-5 text-3xl rounded-lg'>{label}</div>
                    <span>{option}</span>
                    {showAnswer && (
                      <>
                        {isSelected && (
                          <img
                            src={isCorrect ? correctIcon : incorrectIcon}
                            alt={isCorrect ? 'Correct' : 'Incorrect'}
                            className="w-5 h-5"
                          />
                        )}
                        {!isSelected && isCorrect && (
                          <img
                            src={correctIcon}
                            alt="Correct"
                            className="w-5 h-5"
                          />
                        )}
                      </>
                    )}
                  </button>
                );
              })}
            </div>
            {!showAnswer ? (
              <button onClick={handleAnswer} className="mt-4 h-20 p-2 bg-purple text-white md:text-2xl rounded-2xl w-full">
                Submit Answer
              </button>
            ) : (
              <>
                {showNextButton && (
                  <button onClick={handleNextQuestion} className="mt-4 h-20 p-2 bg-purple md:text-2xl text-white rounded-2xl w-full">
                    Next Question
                  </button>
                )}
              </>
            )}
            {showError && (
              <div className="text-red-500 text-2xl w-full mt-4 flex justify-center items-center">
                <img src={errorIcon} alt="" className="inline-block align-middle" />
                Please select an option
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Quiz Completed</h2>
          <p>Your score: {score} / {questions.length}</p>
          <button onClick={handlePlayAgain} className="mt-4 p-2 bg-purple text-white rounded w-full md:w-auto">
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;

