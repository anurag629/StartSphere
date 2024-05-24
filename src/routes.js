import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';

const RoutesConfig = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} /> 
        {/* <Route path="/home" element={<Home />} /> */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<AuthPage />} />
      </Routes>
    </Router>
  );
};

export default RoutesConfig;
