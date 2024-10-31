import React from 'react';
import { useNavigate } from 'react-router-dom';
import TeammateCard from './TeammateCard';
import styles from '../styles/MatchResult.module.scss';

const teammates = [
  {
    name: "hugo",
    role: "Backend",
    experience: 3,
    followers: 7,
    contributions: 318,
    languages: ["Rust", "Python"],
    frameworks: ["NestJS", "Substrate", "PyTorch"]
  },
  {
    name: "tchoi",
    role: "Frontend",
    experience: 5,
    followers: 12,
    contributions: 150,
    languages: ["JavaScript", "HTML", "CSS"],
    frameworks: ["React", "Next.js"]
  },
  {
    name: "c0np4nn4",
    role: "Contract",
    experience: 4,
    followers: 10,
    contributions: 200,
    languages: ["Python"],
    frameworks: ["Django", "Flask"]
  }
];

const MatchResult: React.FC = () => {
  const navigate = useNavigate();

  const handleConfirmTeam = () => {
    navigate('/bounty-approval');
  };

  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.title}>Recommended Teammates</h2>
      <div className={styles.teammateList}>
        {teammates.map(teammate => (
          <TeammateCard 
            key={teammate.name} 
            builder={teammate} 
            onSelect={() => console.log(`${teammate.name} selected`)}
          />
        ))}
      </div>
      <button className={styles.confirmButton} onClick={handleConfirmTeam}>
        Confirm Team
      </button>
    </div>
  );
};

export default MatchResult;






