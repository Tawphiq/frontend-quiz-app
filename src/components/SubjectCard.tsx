import React from 'react';

interface SubjectCardProps {
  title: string;
  icon: string;
  iconbg: string;
  onSelect: (title: string) => void;
}

const SubjectCard: React.FC<SubjectCardProps> = ({ title, icon, iconbg, onSelect }) => {
  return (
    <button
      onClick={() => onSelect(title)}
      className="flex items-center p-4 rounded-2xl bg-white dark:bg-dark shadow"
    >
      <div className={`md:w-12 md:h-12 grid justify-center items-center ${iconbg} rounded-lg mr-2`}>
        <img src={icon} alt={title} className="w-6 h-6" />
      </div>
      <span className='font-bold text-dark dark:text-white'>{title}</span>
    </button>
  );
};

export default SubjectCard;
