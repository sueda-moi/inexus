'use client';
import React from 'react';
import './LoadingScreen.css';

const LoadingScreen: React.FC = () => {
  return (
    <div className="loading-screen show">
      <div className="loading-text-container">
        <div className="loading-bar"></div>
        <div className="loading-text">Team is power</div>
      </div>
    </div>
  );
};

export default LoadingScreen;
