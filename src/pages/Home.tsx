// // src/pages/Home.tsx
// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useQuiz } from '../context/QuizContext';

// const Home: React.FC = () => {
//   const navigate = useNavigate();
//   const { quizzes, setSubject } = useQuiz();
//   const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
//   const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

//   const handleSelect = (subject: string) => {
//     setSubject(subject);
//     navigate('/quiz');
//   };

//   const handleButtonKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, _index: number, subject: string) => {
//     switch (event.key) {
//       case 'Enter':
//         handleSelect(subject);
//         break;
//       case ' ':
//         handleSelect(subject);
//         break;
//       case 'ArrowDown':
//         setFocusedIndex((prevIndex) => (prevIndex === null || prevIndex === quizzes.length - 1 ? 0 : prevIndex + 1));
//         break;
//       case 'ArrowUp':
//         setFocusedIndex((prevIndex) => (prevIndex === null || prevIndex === 0 ? quizzes.length - 1 : prevIndex! - 1));
//         break;
//     }
//   };

//   useEffect(() => {
//     if (focusedIndex !== null && buttonRefs.current[focusedIndex]) {
//       buttonRefs.current[focusedIndex]!.focus();
//     }
//   }, [focusedIndex]);

//   return (
//     <div className="grid lg:grid-cols-2 p-8 md:p-20 lg:px-40">
//       <div className="text-2xl font-bold mb-4 p-4 text-dark dark:text-white">
//         <p className='font-thin text-4xl md:text-6xl lg:text-5xl'>Welcome to the</p>
//         <p className='font-bold text-4xl md:text-6xl lg:text-5xl mb-2 md:mb-5 lg:mb-10'>Frontend Quiz!</p>
//         <i className='font-thin text-sm md:text-2xl text-darkthin dark:text-thinlight'>Pick a subject to get started</i>
//       </div>
//       <div className="grid gap-4 md:mt-10 lg:mt-0">
//         {quizzes.map((quiz, index) => (
//           <button
//             key={quiz.title}
//             onClick={() => handleSelect(quiz.title)}
//             onKeyDown={(event) => handleButtonKeyDown(event, index, quiz.title)}
//             tabIndex={0}
//             ref={(el) => buttonRefs.current[index] = el}
//             className={`flex items-center lg:text-2xl p-4 rounded-2xl bg-white dark:bg-dark shadow focus:outline-none ${
//               focusedIndex === index ? 'border-2 border-purple' : ''
//             }`}
//           >
//             <div className={`md:w-12 md:h-12 p-1 grid justify-center items-center rounded-lg mr-5 ${
//               quiz.title === "HTML" ? 'bg-orange-100'
//               : quiz.title === "CSS" ? 'bg-teal-100'
//               : quiz.title === "JavaScript" ? 'bg-blue-100'
//               : 'bg-fuchsia-100'
//               } `}>
//               <img src={quiz.icon} alt={quiz.title} className="w-6 h-6" />
//             </div>
//             <span className='font-bold text-dark dark:text-white'>{quiz.title}</span>
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;


// src/pages/Home.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { quizzes, setSubject } = useQuiz();
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleSelect = (subject: string) => {
    setSubject(subject);
    navigate(`/quiz/${subject}`);
  };

  const handleButtonKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, _index: number, subject: string) => {
    switch (event.key) {
      case 'Enter':
        handleSelect(subject);
        break;
      case ' ':
        handleSelect(subject);
        break;
      case 'ArrowDown':
        setFocusedIndex((prevIndex) => (prevIndex === null || prevIndex === quizzes.length - 1 ? 0 : prevIndex + 1));
        break;
      case 'ArrowUp':
        setFocusedIndex((prevIndex) => (prevIndex === null || prevIndex === 0 ? quizzes.length - 1 : prevIndex! - 1));
        break;
    }
  };

  useEffect(() => {
    if (focusedIndex !== null && buttonRefs.current[focusedIndex]) {
      buttonRefs.current[focusedIndex]!.focus();
    }
  }, [focusedIndex]);

  return (
    <div className="grid lg:grid-cols-2 p-8 md:p-20 lg:px-40">
      <div className="text-2xl font-bold mb-4 p-4 text-dark dark:text-white">
        <p className='font-thin text-4xl md:text-6xl lg:text-5xl'>Welcome to the</p>
        <p className='font-bold text-4xl md:text-6xl lg:text-5xl mb-2 md:mb-5 lg:mb-10'>Frontend Quiz!</p>
        <i className='font-thin text-sm md:text-2xl text-darkthin dark:text-thinlight'>Pick a subject to get started</i>
      </div>
      <div className="grid gap-4 md:mt-10 lg:mt-0">
        {quizzes.map((quiz, index) => (
          <button
            key={quiz.title}
            onClick={() => handleSelect(quiz.title)}
            onKeyDown={(event) => handleButtonKeyDown(event, index, quiz.title)}
            tabIndex={0}
            ref={(el) => buttonRefs.current[index] = el}
            className={`flex items-center lg:text-2xl p-4 rounded-2xl bg-white dark:bg-dark shadow focus:outline-none ${
              focusedIndex === index ? 'border-2 border-purple' : ''
            }`}
          >
            <div className={`md:w-12 md:h-12 p-1 grid justify-center items-center rounded-lg mr-5 ${
              quiz.title === "HTML" ? 'bg-orange-100'
              : quiz.title === "CSS" ? 'bg-teal-100'
              : quiz.title === "JavaScript" ? 'bg-blue-100'
              : 'bg-fuchsia-100'
              } `}>
              <img src={quiz.icon} alt={quiz.title} className="w-6 h-6" />
            </div>
            <span className='font-bold text-dark dark:text-white'>{quiz.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;

