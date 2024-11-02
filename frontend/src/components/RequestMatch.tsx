import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gameFlowStyles from '../styles/GameFlow.module.scss';

const RequestMatch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRequestMatch = () => {
    setIsLoading(true); 

    
    setTimeout(() => {
      setIsLoading(false); 
      navigate('/match-result'); 
    }, 2000); 
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



