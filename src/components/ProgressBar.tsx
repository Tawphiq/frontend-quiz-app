import React from 'react';

interface ProgressBarProps {
  totalQuestions: number;
  currentQuestionIndex: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ totalQuestions, currentQuestionIndex }) => {
  const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="w-full bg-gray-300 rounded-full h-4 mb-4">
      <div
        className="bg-blue-500 h-4 rounded-full"
        style={{ width: `${progressPercentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
