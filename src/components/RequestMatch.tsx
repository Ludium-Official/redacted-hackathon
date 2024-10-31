import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gameFlowStyles from '../styles/GameFlow.module.scss';

const RequestMatch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRequestMatch = () => {
    setIsLoading(true); // Start loading

    // Simulate a delay of 2 seconds before navigation
    setTimeout(() => {
      setIsLoading(false); // Stop loading
      navigate('/match-result'); // Navigate to match result page
    }, 2000); // Adjust delay time as needed
  };

  return (
    <div className={gameFlowStyles.gameFlow}>
      <div className={gameFlowStyles.gameStep}>
        <h2 className={gameFlowStyles.pageTitle}>Request a Match</h2>
        <p>Find teammates or join projects that match your skills and interests.</p>

        {isLoading ? (
          <p className={gameFlowStyles.loadingMessage}>Searching for Team...</p>
        ) : (
          <button onClick={handleRequestMatch} className={gameFlowStyles.startGameFlowButton}>
            Request Match
          </button>
        )}
      </div>
    </div>
  );
};

export default RequestMatch;



