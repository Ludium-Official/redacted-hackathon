import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/CareerVerification.module.scss';

const CareerVerification = () => {
  const navigate = useNavigate();
  const [isConnected, setIsConnected] = useState(false);

  const handleConnectWallet = () => {
    setIsConnected(true);
  };

  const handlePlatformSelect = (platform: string) => {
    if (platform === 'github') {
      navigate('/github-verification'); 
    }
    
  };

  return (
    <div className={styles.pageContainer}>
      {(
        <div className={styles.card}>
          <h2 className={styles.pageTitle}>Choose Career Verification Platform</h2>
          <p className={styles.message}>Which career would you like to verify?</p>
          <button onClick={() => handlePlatformSelect('github')} className={styles.platformButton}>
            GitHub
          </button>
          <button onClick={() => handlePlatformSelect('linkedin')} className={styles.platformButton}>
            LinkedIn
          </button>
          <button onClick={() => handlePlatformSelect('kaggle')} className={styles.platformButton}>
            Kaggle
          </button>
          <button onClick={() => handlePlatformSelect('other')} className={styles.platformButton}>
            Other Services
          </button>
        </div>
      )}
    </div>
  );
};

export default CareerVerification;



