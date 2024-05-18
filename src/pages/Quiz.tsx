{/*import React, { useState } from 'react';
import { useQuiz } from '../context/QuizContext';
import { useNavigate } from 'react-router-dom';

const Quiz: React.FC = () => {
  const { currentQuiz, score, setScore } = useQuiz();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);

  const navigate = useNavigate()

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
    navigate('/')
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

export default Quiz;*/}


// src/pages/Quiz.tsx
import React, { useState } from 'react';
import { useQuiz } from '../context/QuizContext';

const Quiz: React.FC = () => {
  const { currentQuiz, score, setScore } = useQuiz();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);

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
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }

    setShowNextButton(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setShowAnswer(false);
      setIsCorrect(null);
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
    setIsCorrect(null);
    setShowAnswer(false);
    setShowNextButton(false);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      {!quizCompleted ? (
        <div>
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">{questions[currentQuestionIndex].question}</h2>
          <div className="flex flex-col items-start">
            {questions[currentQuestionIndex].options.map((option, index) => (
              <div key={index} className="mb-2 w-full">
                <input
                  type="radio"
                  id={`option-${index}`}
                  name="option"
                  value={option}
                  checked={selectedOption === option}
                  onChange={() => setSelectedOption(option)}
                  className="mr-2"
                  disabled={showAnswer}
                />
                <label
                  htmlFor={`option-${index}`}
                  className={`p-2 border rounded block ${
                    showAnswer
                      ? option === questions[currentQuestionIndex].answer
                        ? 'border-green-500'
                        : selectedOption === option
                        ? 'border-red-500'
                        : ''
                      : ''
                  }`}
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
          {showError && <div className="text-red-500">Please select an option.</div>}
          {!showAnswer ? (
            <button onClick={handleAnswer} className="mt-4 p-2 bg-blue-500 text-white rounded w-full md:w-auto">
              Submit Answer
            </button>
          ) : (
            <>
              {isCorrect ? (
                <div className="mt-4 text-green-500">Correct!</div>
              ) : (
                <div className="mt-4 text-red-500">
                  Incorrect! The correct answer is: {questions[currentQuestionIndex].answer}
                </div>
              )}
              {showNextButton && (
                <button onClick={handleNextQuestion} className="mt-4 p-2 bg-blue-500 text-white rounded w-full md:w-auto">
                  Next Question
                </button>
              )}
            </>
          )}
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
