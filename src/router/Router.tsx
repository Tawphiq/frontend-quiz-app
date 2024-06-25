// src/Router.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Quiz from '../pages/Quiz';
import Result from '../pages/Results';
import Header from '../components/Header';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz/:subject" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
