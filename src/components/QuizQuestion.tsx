// src/components/QuizQuestion.tsx
import React, { useState } from 'react';

interface QuizQuestionProps {
  question: string;
  options: string[];
  correctAnswer: string;
  onAnswer: (isCorrect: boolean) => void;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({ question, options, correctAnswer, onAnswer }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);

  const handleSubmit = () => {
    if (selectedOption === null) {
      setShowError(true);
      return;
    }
    setShowError(false);
    onAnswer(selectedOption === correctAnswer);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{question}</h2>
      {options.map((option, index) => (
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
      <button onClick={handleSubmit} className="mt-4 p-2 bg-blue-500 text-white rounded">
        Submit Answer
      </button>
    </div>
  );
};

export default QuizQuestion;
