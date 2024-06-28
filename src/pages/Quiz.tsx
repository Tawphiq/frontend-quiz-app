import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import ProgressBar from '../components/ProgressBar';
import correctIcon from '../assets/images/icon-correct.svg';
import incorrectIcon from '../assets/images/icon-incorrect.svg';
import errorIcon from '../assets/images/icon-error.svg';
import Results from './Results';

const Quiz: React.FC = () => {
  const { currentQuiz, score, setScore } = useQuiz();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);

  const navigate = useNavigate();
  const optionsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const submitRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (currentQuiz) {
      optionsRef.current = optionsRef.current.slice(0, currentQuiz.questions[currentQuestionIndex].options.length);
    }
  }, [currentQuiz, currentQuestionIndex]);

  const handleAnswer = () => {
    if (selectedOption === null) {
      setShowError(true);
      return;
    }

    setShowError(false);
    setShowAnswer(true);

    if (selectedOption === currentQuiz?.questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }

    setShowNextButton(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < (currentQuiz?.questions.length ?? 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setShowAnswer(false);
      setShowNextButton(false);
      setShowError(false);
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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number, option: string) => {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (!showAnswer) {
          setSelectedOption(option);
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (index > 0) {
          optionsRef.current[index - 1]?.focus();
        } else {
          submitRef.current?.focus();
        }
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (index < optionsRef.current.length - 1) {
          optionsRef.current[index + 1]?.focus();
        } else if (index === optionsRef.current.length - 1) {
          submitRef.current?.focus();
        }
        break;
      default:
        break;
    }
  };

  const handleSubmitKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        optionsRef.current[optionsRef.current.length - 1]?.focus();
        break;
      case 'ArrowDown':
        event.preventDefault();
        nextRef.current?.focus();
        break;
      default:
        break;
    }
  };

  if (!currentQuiz) {
    return <div>No quiz selected.</div>;
  }

  const questions = currentQuiz.questions;

  return (
    <div className="p-4 lg:py-6 md:p-20">
      {!quizCompleted ? (
        <div className="lg:flex lg:gap-20">
          <div className="lg:w-1/2">
            <i className="mb-4 text-center lg:text-left font-thin text-sm md:text-2xl text-darkthin dark:text-thinlight">
              Question {currentQuestionIndex + 1} of {questions.length}
            </i>
            <h3 className="text-start text-lg md:text-xl font-semibold mb-4 lg:mb-20 lg:text-left">
              {questions[currentQuestionIndex].question}
            </h3>
            <div className='lg:mt-64'>
              <ProgressBar totalQuestions={questions.length} currentQuestionIndex={currentQuestionIndex} />
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="flex flex-col items-start">
              {questions[currentQuestionIndex].options.map((option, index) => {
                const label = String.fromCharCode(65 + index); // Converting index to letter (A, B, C, ...)
                const isCorrect = showAnswer && option === questions[currentQuestionIndex].answer;
                const isSelected = selectedOption === option;
                const isSelectedAndIncorrect = showAnswer && isSelected && !isCorrect;
                const notSelectedButCorrect = showAnswer && !isSelected && isCorrect;
                const labelBg = showAnswer
                ? isCorrect
                  ? `${notSelectedButCorrect ? '' : 'bg-emerald-400 group-hover:bg-emerald-400 group-hover:text-white text-white'}`
                  : isSelectedAndIncorrect
                  ? 'bg-red-500 text-white group-hover:bg-red-500 group-hover:text-white'
                  : 'bg-lightbg'
                : isSelected
                ? 'bg-purple text-white group-hover:bg-purple group-hover:text-white'
                : ''


                return (
                  <button
                    key={index}
                    onClick={() => !showAnswer && setSelectedOption(option)}
                    onKeyDown={(event) => handleKeyDown(event, index, option)}
                    className={`group p-4 h-20 rounded-2xl shadow bg-white dark:bg-dark md:text-xl font-semibold text-dark dark:text-white w-full text-left mb-2 flex items-center justify-between ${
                      showAnswer
                        ? isCorrect
                          ? `${notSelectedButCorrect ? '' : 'border-emerald-400 border-2'}`
                          : isSelectedAndIncorrect
                          ? 'border-red-500 border-2'
                          : 'border-gray-300'
                        : isSelected
                        ? 'border-purple border-2 dark:text-white'
                        : ''
                    }`}
                    disabled={showAnswer}
                    tabIndex={0}
                    ref={(el) => (optionsRef.current[index] = el)}
                  >
                    <div className='flex items-center'>
                      <div
                        className={` md:w-12 md:h-12 p-1 grid justify-center items-center  bg-lightbg text-darkthin dark:text-dark mr-5 text-3xl rounded-lg group-hover:bg-fuchsia-100 group-hover:text-purple ${labelBg}
                        `}
                      >
                        {label}
                      </div>
                      <span>{option}</span>
                    </div>
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
              <button
                onClick={handleAnswer}
                className="mt-4 h-20 p-2 bg-purple text-white md:text-2xl rounded-2xl w-full hover:bg-fuchsia-400"
                ref={submitRef}
                tabIndex={0}
                onKeyDown={handleSubmitKeyDown}
              >
                Submit Answer
              </button>
            ) : (
              <>
                {showNextButton && (
                  <button
                    onClick={handleNextQuestion}
                    className="mt-4 h-20 p-2 bg-purple hover:bg-fuchsia-400 md:text-2xl text-white rounded-2xl w-full"
                    ref={nextRef}
                    tabIndex={0}
                  >
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
        <Results score={score} totalQuestions={questions.length} handlePlayAgain={handlePlayAgain} />
      )}
    </div>
  );
};

export default Quiz;



