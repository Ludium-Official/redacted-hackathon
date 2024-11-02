import React from 'react';
import styles from '../styles/RecommendedTeammates.module.scss';

interface Builder {
  name: string;
  role: string;
  experience: number;
  followers: number;
  contributions: number;
  languages: string[];
  frameworks: string[];
}

interface TeammateCardProps {
  builder: Builder;
  onSelect: () => void;
}

const TeammateCard: React.FC<TeammateCardProps> = ({ builder, onSelect }) => {
  return (
    <div className={styles.teammateCard}>
     
      <h3 className={styles.builderName}>{builder.name}</h3>
      <p className={styles.builderRole}>{builder.role}</p>
      
   
      <div className={styles.builderExperience}>
        {builder.experience} years experience
      </div>

      
      <div className={styles.profileDetails}>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Followers:</span>
          <span className={styles.detailValue}>{builder.followers}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Contributions:</span>
          <span className={styles.detailValue}>{builder.contributions}</span>
        </div>
      </div>

     
      <div className={styles.languageFrameworkContainer}>
        
        <div className={styles.languageList}>
          {builder.languages.map((language) => (
            <span key={language} className={styles.languageItem}>
              {language}
            </span>
          ))}
        </div>
       
        <div className={styles.frameworkList}>
          {builder.frameworks.map((framework) => (
            <span key={framework} className={styles.frameworkItem}>
              {framework}
            </span>
          ))}
        </div>
      </div>

      <button className={styles.selectButton} onClick={onSelect}>
        Select
      </button>
    </div>
  );
};

export default TeammateCard;


