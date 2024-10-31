import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/LLMHackathonJudging.module.scss';

// Mock data for teams and evaluation criteria
const teamsData = [
  {
    name: "Builder Matching System (Ludium)",
    description: "Back-end, front-end, and smart contract components implemented. Solid pitch deck with offline presentation.",
    completion: 90,
    innovation: 18,
    implementation: 27,
    uiUx: 13.5,
    practicality: 18,
    presentation: 13.5,
  },
  {
    name: "Social Community Management AI Bot",
    description: "Front-end and smart contract partially implemented. Decent pitch deck with offline presentation.",
    completion: 80,
    innovation: 16,
    implementation: 24,
    uiUx: 12,
    practicality: 16,
    presentation: 12,
  },
  {
    name: "Onchain Data-Based Auto Investment Bot",
    description: "Front-end component implemented with basic pitch deck and online presentation.",
    completion: 40,
    innovation: 8,
    implementation: 12,
    uiUx: 6,
    practicality: 8,
    presentation: 6,
  }
];

const LLMHackathonJudging: React.FC = () => {
  const [resultsVisible, setResultsVisible] = useState(false);
  const navigate = useNavigate();

  // Calculate the total score based on the evaluation criteria
  const calculateTotalScore = (team: any) => {
    return team.innovation + team.implementation + team.uiUx + team.practicality + team.presentation;
  };

  // Display results and navigate to reward distribution
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
            <p>Completion Level: {team.completion}%</p>
          </div>
        ))}
      </div>

      <button onClick={displayResults} className={styles.evaluateButton}>
        Evaluate Submissions
      </button>

      {resultsVisible && (
        <div className={styles.resultsSection}>
          <h3 className={styles.sectionTitle}>Final Ranking</h3>
          {teamsData
            .sort((a, b) => calculateTotalScore(b) - calculateTotalScore(a))
            .map((team, index) => (
              <div key={team.name} className={styles.resultCard}>
                <h4>
                  {index + 1}st Place: {team.name}
                </h4>
                <p>Total Score: {calculateTotalScore(team)}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default LLMHackathonJudging;
