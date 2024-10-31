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
      {/* Name and Role */}
      <h3 className={styles.builderName}>{builder.name}</h3>
      <p className={styles.builderRole}>{builder.role}</p>
      
      {/* Experience */}
      <div className={styles.builderExperience}>
        {builder.experience} years experience
      </div>

      {/* Profile Details: Followers and Contributions */}
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

      {/* Languages and Frameworks */}
      <div className={styles.languageFrameworkContainer}>
        {/* Languages */}
        <div className={styles.languageList}>
          {builder.languages.map((language) => (
            <span key={language} className={styles.languageItem}>
              {language}
            </span>
          ))}
        </div>
        {/* Frameworks */}
        <div className={styles.frameworkList}>
          {builder.frameworks.map((framework) => (
            <span key={framework} className={styles.frameworkItem}>
              {framework}
            </span>
          ))}
        </div>
      </div>

      {/* Select Button */}
      <button className={styles.selectButton} onClick={onSelect}>
        Select
      </button>
    </div>
  );
};

export default TeammateCard;


