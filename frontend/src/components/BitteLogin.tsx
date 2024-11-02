import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/BitteLogin.module.scss';

const BitteLogin = () => {
  const [isConnected, setIsConnected] = useState(false);
  const navigate = useNavigate();

  const handleConnectWallet = () => {
    setIsConnected(true);
    
    setTimeout(() => navigate('/career-verification'), 500);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.card}>
        <h2 className={styles.pageTitle}>Bitte Login</h2>
        <p className={styles.message}>
          {isConnected ? 'Wallet Connected Successfully!' : 'Please connect your wallet to proceed.'}
        </p>
        <button
          onClick={handleConnectWallet}
          className={styles.connectButton}
          disabled={isConnected}
        >
          {isConnected ? 'Connected' : 'Connect Wallet'}
        </button>
      </div>
    </div>
  );
};

export default BitteLogin;







