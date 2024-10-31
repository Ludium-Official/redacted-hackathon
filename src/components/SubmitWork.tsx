import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/SubmitWork.module.scss';

const SubmitWork: React.FC = () => {
  const [repoLink, setRepoLink] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (repoLink) {
      alert(`Submitted work with repo link: ${repoLink}`);
      // Navigate to the LLM Hackathon Judging page
      navigate('/llm-hackathon-judging');
    } else {
      alert("Please enter a repository link before submitting.");
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.card}>
        <h2 className={styles.title}>Submit Work</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="repoLink" className={styles.label}>
            Repository Link
          </label>
          <input
            type="url"
            id="repoLink"
            className={styles.input}
            value={repoLink}
            onChange={(e) => setRepoLink(e.target.value)}
            placeholder="https://github.com/username/repo"
            required
          />
          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmitWork;


