import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/BountyApproval.module.scss';

const BountyApproval: React.FC = () => {
  const navigate = useNavigate();

  const handleApproval = () => {
    // Navigate to the BountyAssigned page
    navigate('/submit-work');
  };

  return (
    <div className={styles.approvalContainer}>
      <div className={styles.approvalCard}>
        <h2 className={styles.approvalTitle}>Bounty Owner Approval</h2>
        <p className={styles.approvalMessage}>
          Waiting for the bounty owner's approval to start.
        </p>
        <button className={styles.approvalButton} onClick={handleApproval}>
          Get Approval
        </button>
      </div>
    </div>
  );
};

export default BountyApproval;

