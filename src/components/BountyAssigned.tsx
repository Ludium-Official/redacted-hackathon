import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/BountyAssigned.module.scss';

const BountyAssigned: React.FC = () => {
  const navigate = useNavigate();

  const handleProceed = () => {
    // Navigate to the SubmitWork page
    navigate('/submit-work');
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.card}>
        <h2 className={styles.title}>Bounty Assigned</h2>
        <p className={styles.message}>You have been assigned to a new bounty task.</p>
        <button className={styles.proceedButton} onClick={handleProceed}>
          Proceed to Team Formation
        </button>
      </div>
    </div>
  );
};

export default BountyAssigned;

