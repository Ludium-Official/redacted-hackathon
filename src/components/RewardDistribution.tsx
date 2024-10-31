import React, { useState } from 'react';
import styles from '../styles/RewardDistribution.module.scss';

const RewardDistribution: React.FC = () => {
  const [rewardStatus, setRewardStatus] = useState("100% paid");
  const [distributionMethod, setDistributionMethod] = useState("");

  const handleDistribution = (method: string) => {
    setDistributionMethod(method);
    alert(`Rewards will be distributed ${method === 'equal' ? 'equally among team members' : 'based on individual contributions'}.`);
  };

  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.title}>Reward Distribution</h2>

      <div className={styles.statusSection}>
        <h3 className={styles.sectionTitle}>Reward Status</h3>
        <p>{rewardStatus}</p>
      </div>

      <div className={styles.distributionSection}>
        <h3 className={styles.sectionTitle}>Choose Distribution Method</h3>
        <button 
          className={styles.distributeButton} 
          onClick={() => handleDistribution("equal")}
        >
          Split Equally Among Team Members
        </button>
        <button 
          className={styles.distributeButton} 
          onClick={() => handleDistribution("contribution")}
        >
          Distribute Based on Contribution
        </button>
      </div>

      {distributionMethod && (
        <div className={styles.confirmationMessage}>
          <p>Rewards have been set to distribute {distributionMethod === "equal" ? "equally" : "based on contribution"}.</p>
        </div>
      )}
    </div>
  );
};

export default RewardDistribution;
