import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gameFlowStyles from '../styles/GameFlow.module.scss';

const BitteLogin = () => {
  const [isConnected, setIsConnected] = useState(false);
  const navigate = useNavigate();

  const handleConnectWallet = () => {
    setIsConnected(true);
    // Redirect to Request Match page after connecting wallet
    setTimeout(() => navigate('/request-match'), 500);
  };

  return (
    <div className={gameFlowStyles.gameFlow}>
      <div className={gameFlowStyles.gameStep}>
        <h2 className={gameFlowStyles.pageTitle}>Bitte Login</h2>
        <p>{isConnected ? 'Wallet Connected Successfully!' : 'Please connect your wallet to proceed.'}</p>
        <button
          onClick={handleConnectWallet}
          className={gameFlowStyles.startGameFlowButton}
          disabled={isConnected}
        >
          {isConnected ? 'Connected' : 'Connect Wallet'}
        </button>
      </div>
    </div>
  );
};

export default BitteLogin;




