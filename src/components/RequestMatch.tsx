import React from 'react';
import { useNavigate } from 'react-router-dom';
import gameFlowStyles from '../styles/GameFlow.module.scss';

const RequestMatch = () => {
  const navigate = useNavigate();

  const handleRequestMatch = () => {
    // Navigate to the MatchResult page
    navigate('/match-result');
  };

  return (
    <div className={gameFlowStyles.gameFlow}>
      <div className={gameFlowStyles.gameStep}>
        <h2 className={gameFlowStyles.pageTitle}>Request a Match</h2>
        <p>Find teammates or join projects that match your skills and interests.</p>
        <button onClick={handleRequestMatch} className={gameFlowStyles.startGameFlowButton}>
          Request Match
        </button>
      </div>
    </div>
  );
};

export default RequestMatch;


