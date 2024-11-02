import { useNavigate } from 'react-router-dom';
import gameFlowStyles from '../styles/GameFlow.module.scss';

const GameFlowPage = () => {
  const navigate = useNavigate();

  const goToBounties = () => {
    navigate('/bounties');
  };

  return (
    <div className={gameFlowStyles.gameFlow}>
      <h1>Web3 Career Pathfinder</h1>
      <div className={gameFlowStyles.gameStep}>
        <h2>Register as a Builder</h2>
        <p>Create your profile to join the bounty program.</p>
        <button onClick={goToBounties} className={gameFlowStyles.startGameFlowButton}>View Bounties</button>
      </div>
    </div>
  );
};

export default GameFlowPage;


