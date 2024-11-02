import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/LLMHackathonJudging.module.scss';

const teamsData = [
  {
    name: "Builder Matching System (Ludium)",
    description: "Back-end, front-end, and smart contract components implemented. Solid pitch deck with offline presentation.",
    innovation: 8,
    implementation: 9,
    uiUx: 8,
    practicality: 9,
    presentation: 8,
  },
  {
    name: "Social Community Management AI Bot",
    description: "Front-end and smart contract partially implemented. Decent pitch deck with offline presentation.",
    innovation: 7,
    implementation: 6,
    uiUx: 5,
    practicality: 6,
    presentation: 6,
  },
  {
    name: "Onchain Data-Based Auto Investment Bot",
    description: "Front-end component implemented with basic pitch deck and online presentation.",
    innovation: 5,
    implementation: 3,
    uiUx: 4,
    practicality: 4,
    presentation: 5,
  }
];

const LLMHackathonJudging: React.FC = () => {
  const [resultsVisible, setResultsVisible] = useState(false);
  const navigate = useNavigate();

  const calculateTotalScore = (team: any) => {
    const total = team.innovation + team.implementation + team.uiUx + team.practicality + team.presentation;
    return (total / 5).toFixed(2);
  };

  const displayResults = () => {
    setResultsVisible(true);
    setTimeout(() => {
      alert("Evaluation completed. Moving to reward distribution...");
      navigate('/reward-distribution');
    }, 1000);
  };

  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.title}>LLM Hackathon Judging</h2>

      {resultsVisible && (
        <div className={styles.resultsSection}>
          <h3 className={styles.sectionTitle}>🏆 Final Ranking 🏆</h3>
          {teamsData
            .sort((a, b) => parseFloat(calculateTotalScore(b)) - parseFloat(calculateTotalScore(a)))
            .map((team, index) => (
              <div key={team.name} className={styles.resultCard}>
                <h4 className={styles.rank}>
                  {index + 1}st Place: {team.name}
                </h4>
                <div className={styles.scores}>
                  <p><strong>Innovation:</strong> {team.innovation}</p>
                  <p><strong>Implementation:</strong> {team.implementation}</p>
                  <p><strong>UI/UX:</strong> {team.uiUx}</p>
                  <p><strong>Practicality:</strong> {team.practicality}</p>
                  <p><strong>Presentation:</strong> {team.presentation}</p>
                </div>
                <p className={styles.totalScore}>Total Score: {calculateTotalScore(team)}</p>
              </div>
            ))}
        </div>
      )}

      {!resultsVisible && (
        <>
          <div className={styles.criteriaSection}>
            <h3 className={styles.sectionTitle}>Judging Criteria</h3>
            <ul>
              <li>Innovation: 20%</li>
              <li>Implementation: 30%</li>
              <li>UI/UX: 15%</li>
              <li>Practicality: 20%</li>
              <li>Presentation: 15%</li>
            </ul>
          </div>

          <div className={styles.teamsSection}>
            <h3 className={styles.sectionTitle}>Team AI Matching</h3>
            {teamsData.map((team) => (
              <div key={team.name} className={styles.teamCard}>
                <h4 className={styles.teamName}>{team.name}</h4>
                <p>{team.description}</p>
              </div>
            ))}
          </div>

          <button onClick={displayResults} className={styles.evaluateButton}>
            Evaluate Submissions
          </button>
        </>
      )}
    </div>
  );
};

export default LLMHackathonJudging;




