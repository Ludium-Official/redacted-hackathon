import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/GithubVerification.module.scss';

// Importing images (ensure these paths are correct)
import githubOAuth from '../assets/github-oauth.png';
import reclaimVerified from '../assets/reclaim-verified.png';
import reclaimData from '../assets/reclaim-data.png';

const GitHubVerificationCarousel = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const images = [githubOAuth, reclaimVerified, reclaimData];

  // Automatically advance the image every 2 seconds, but only once per image
  useEffect(() => {
    if (currentStep < images.length - 1) {
      const interval = setInterval(() => {
        setCurrentStep((prevStep) => prevStep + 1);
      }, 2000); // 2 seconds per image

      return () => clearInterval(interval); // Clear interval on component unmount
    }
  }, [currentStep, images.length]);

  const handleContinue = () => {
    navigate('/request-match');
  };

  return (
    <div className={styles.gameFlow}>
      <div className={styles.card}>
        <h2 className={styles.pageTitle}>GitHub Verification</h2>
        <p>Follow the GitHub verification steps to proceed.</p>

        {/* Image Carousel */}
        <div className={styles.carouselContainer}>
          <img src={images[currentStep]} alt="Verification Step" className={`${styles.carouselImage} ${styles.slideIn}`} />
        </div>

        <button onClick={handleContinue} className={styles.startGameFlowButton}>
          Continue to Request Match
        </button>
      </div>
    </div>
  );
};

export default GitHubVerificationCarousel;






