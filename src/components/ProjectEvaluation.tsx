import React, { useState } from 'react';
import styles from '../styles/ProjectEvaluation.module.scss';

const ProjectEvaluation: React.FC = () => {
  const [completionPercentage, setCompletionPercentage] = useState(95);
  const [isPaymentReleased, setIsPaymentReleased] = useState(false);

  const handleSettlement = () => {
    if (completionPercentage >= 95) {
      setIsPaymentReleased(true);
      alert("Payment has been released to the team members.");
    } else {
      alert("Project has not met the completion requirement for full payment.");
    }
  };

  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.title}>Project Evaluation & Settlement</h2>
      
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Evaluation Criteria</h3>
        <ul className={styles.criteriaList}>
          <li>Innovation (20%)</li>
          <li>Implementation (30%)</li>
          <li>UI/UX (15%)</li>
          <li>Practicality (20%)</li>
          <li>Presentation (15%)</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Completion Status</h3>
        <div className={styles.completionStatus}>
          <p>Completion: {completionPercentage}%</p>
          <progress max="100" value={completionPercentage} className={styles.progressBar}></progress>
        </div>
      </div>

      <button className={styles.settlementButton} onClick={handleSettlement}>
        Settle Project
      </button>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Payment Status</h3>
        {isPaymentReleased ? (
          <p className={styles.paymentStatus}>The reward has been 100% paid to the team members.</p>
        ) : (
          <p className={styles.paymentStatus}>Payment is pending or partially withheld.</p>
        )}
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Reward Distribution</h3>
        <p>Bounty rewards will be distributed among team members based on their contribution and role.</p>
      </div>
    </div>
  );
};

export default ProjectEvaluation;
