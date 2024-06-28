import React from 'react';

interface ProgressBarProps {
  totalQuestions: number;
  currentQuestionIndex: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ totalQuestions, currentQuestionIndex }) => {
  const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="w-full bg-white shadow rounded-full h-3 mb-4">
      <div
        className="bg-purple-500 h-3 rounded-full"
        style={{ width: `${progressPercentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
