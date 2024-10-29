'use client';


import { useState } from 'react';
import gameFlowStyles from './GameFlow.module.scss';

const GameFlowPage = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prevStep) => prevStep + 1);

  const renderGameFlowStep = () => {
    switch (step) {
      case 1:
        return <RegisterBuilder onNext={nextStep} />;
      case 2:
        return <RequestMatch onNext={nextStep} />;
      case 3:
        return <TeamRecommendation onNext={nextStep} />;
      case 4:
        return <BountyAssignment onNext={nextStep} />;
      case 5:
        return <TeamFormation onNext={nextStep} />;
      case 6:
        return <BountyApproval onNext={nextStep} />;
      case 7:
        return <WorkStart />;
      default:
        return <h2>All steps completed!</h2>;
    }
  };

  return (
    <div className={gameFlowStyles.gameFlow}>
      <h1>Web3 Career Pathfinder</h1>
      {renderGameFlowStep()}
    </div>
  );
};

export default GameFlowPage;

// GameFlow

const RegisterBuilder = ({ onNext }: { onNext: () => void }) => (
  <div className={gameFlowStyles.gameStep}>
    <h2>Register as a Builder</h2>
    <p>Create your profile to join the bounty program.</p>
    <button onClick={onNext} className={gameFlowStyles.startGameFlowButton}>Register Profile</button>
  </div>
);

const RequestMatch = ({ onNext }: { onNext: () => void }) => (
  <div className={gameFlowStyles.gameStep}>
    <h2>Request Match</h2>
    <p>Searching for the best teammates for your skills.</p>
    <button onClick={onNext} className={gameFlowStyles.startGameFlowButton}>Request Match</button>
  </div>
);

const TeamRecommendation = ({ onNext }: { onNext: () => void }) => (
  <div className={gameFlowStyles.gameStep}>
    <h2>Recommended Teammates</h2>
    <div className={gameFlowStyles.recommendedProfiles}>
      <ProfileCard name="Teammate 1" role="Developer" />
      <ProfileCard name="Teammate 2" role="Designer" />
      <ProfileCard name="Teammate 3" role="PM" />
    </div>
    <button onClick={onNext} className={gameFlowStyles.startGameFlowButton}>Confirm Team</button>
  </div>
);

const BountyAssignment = ({ onNext }: { onNext: () => void }) => (
  <div className={gameFlowStyles.gameStep}>
    <h2>Bounty Assigned</h2>
    <p>You have been assigned to a new bounty task.</p>
    <button onClick={onNext} className={gameFlowStyles.startGameFlowButton}>Proceed to Team Formation</button>
  </div>
);

const TeamFormation = ({ onNext }: { onNext: () => void }) => (
  <div className={gameFlowStyles.gameStep}>
    <h2>Choose Team Formation</h2>
    <p>Select whether to proceed solo or with your team.</p>
    <button onClick={onNext} className={gameFlowStyles.startGameFlowButton}>Form Team</button>
  </div>
);

const BountyApproval = ({ onNext }: { onNext: () => void }) => (
  <div className={gameFlowStyles.gameStep}>
    <h2>Bounty Owner Approval</h2>
    <p>Waiting for the bounty owner's approval to start.</p>
    <button onClick={onNext} className={gameFlowStyles.startGameFlowButton}>Get Approval</button>
  </div>
);

const WorkStart = () => (
  <div className={gameFlowStyles.gameStep}>
    <h2>Start Work</h2>
    <p>Your team is ready to start working on the assigned bounty. Good luck!</p>
  </div>
);

// Profile

const ProfileCard = ({ name, role }: { name: string; role: string }) => (
  <div className={gameFlowStyles.profileCard}>
    <h3>{name}</h3>
    <p>{role}</p>
    <button>Select</button>
  </div>
);

