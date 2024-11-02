import { useNavigate, useParams } from 'react-router-dom';
import gameFlowStyles from '../styles/GameFlow.module.scss';

const BountyDetails = () => {
  const navigate = useNavigate();
  const { bountyId } = useParams<{ bountyId: string }>();

  const bountyData = {
    bounty1: {
      title: 'Redacted Hackathon',
      idea: 'Create an innovative AI tool to enhance blockchain functionalities.',
      reward: '$10,000',
      criteria: 'Innovation, Feasibility, Impact',
      deadline: 'December 31, 2024',
    },
    bounty2: {
      title: 'Blockchain Security Challenge',
      idea: 'Develop solutions to improve blockchain security protocols.',
      reward: '$8,000',
      criteria: 'Security Enhancement, Efficiency, Scalability',
      deadline: 'January 15, 2025',
    },
    bounty3: {
      title: 'Decentralized Voting System',
      idea: 'Develop a decentralized voting system with high integrity.',
      reward: '$5,000',
      criteria: 'Transparency, Security, Accessibility',
      deadline: 'February 20, 2025',
    },
    bounty4: {
      title: 'Data Privacy Enhancement',
      idea: 'Create robust privacy solutions for personal data on the blockchain.',
      reward: '$7,500',
      criteria: 'Privacy, Efficiency, Usability',
      deadline: 'March 5, 2025',
    },
    bounty5: {
      title: 'NFT Marketplace Plugin',
      idea: 'Build a modular NFT marketplace plugin for e-commerce sites.',
      reward: '$6,000',
      criteria: 'Integration, Performance, User Experience',
      deadline: 'March 30, 2025',
    },
    bounty6: {
      title: 'Crypto Wallet Integration',
      idea: 'Develop seamless integration with top crypto wallets.',
      reward: '$9,000',
      criteria: 'Compatibility, Security, Usability',
      deadline: 'April 15, 2025',
    },
    bounty7: {
      title: 'Smart Contract Optimization',
      idea: 'Reduce gas fees through smart contract optimizations.',
      reward: '$4,000',
      criteria: 'Efficiency, Security, Cost Reduction',
      deadline: 'April 30, 2025',
    },
    bounty8: {
      title: 'AI-Powered Analytics',
      idea: 'Create an AI tool to analyze blockchain transaction patterns.',
      reward: '$12,000',
      criteria: 'Accuracy, Speed, Innovation',
      deadline: 'May 20, 2025',
    },
    bounty9: {
      title: 'Cross-Chain Bridge Development',
      idea: 'Develop a bridge to connect different blockchain networks.',
      reward: '$15,000',
      criteria: 'Reliability, Security, Scalability',
      deadline: 'June 10, 2025',
    },
    bounty10: {
      title: 'DeFi Lending Protocol',
      idea: 'Build a decentralized lending platform for digital assets.',
      reward: '$20,000',
      criteria: 'Security, Flexibility, Performance',
      deadline: 'June 25, 2025',
    },
    bounty11: {
      title: 'Green Energy Blockchain',
      idea: 'Develop a blockchain for tracking green energy credits.',
      reward: '$10,000',
      criteria: 'Sustainability, Accuracy, Security',
      deadline: 'July 15, 2025',
    },
    bounty12: {
      title: 'Digital Identity Verification',
      idea: 'Create a digital identity system with high verification standards.',
      reward: '$7,500',
      criteria: 'Security, Accessibility, Privacy',
      deadline: 'August 1, 2025',
    },
    bounty13: {
      title: 'Gaming NFT Integrations',
      idea: 'Integrate NFTs for in-game items and assets.',
      reward: '$5,000',
      criteria: 'Interactivity, Compatibility, User Experience',
      deadline: 'August 15, 2025',
    },
    bounty14: {
      title: 'Supply Chain Transparency',
      idea: 'Use blockchain to bring transparency to supply chains.',
      reward: '$9,000',
      criteria: 'Traceability, Security, Efficiency',
      deadline: 'September 1, 2025',
    },
    bounty15: {
      title: 'Healthcare Data Sharing',
      idea: 'Develop a secure protocol for sharing healthcare data.',
      reward: '$10,000',
      criteria: 'Privacy, Interoperability, Security',
      deadline: 'September 30, 2025',
    },
  };

  const bounty = bountyData[bountyId as keyof typeof bountyData];

  const goToLogin = () => {
    navigate('/login');
  };

  if (!bounty) {
    return <h2 className={gameFlowStyles.pageTitle}>Bounty Not Found</h2>;
  }

  return (
    <div className={gameFlowStyles.gameFlow}>
      <div className={gameFlowStyles.gameStep}>
        <h2 className={gameFlowStyles.pageTitle}>{bounty.title}</h2>
        <p><strong>Idea:</strong> {bounty.idea}</p>
        <p><strong>Reward:</strong> {bounty.reward}</p>
        <p><strong>Evaluation Criteria:</strong> {bounty.criteria}</p>
        <p><strong>Submission Deadline:</strong> {bounty.deadline}</p>
        <button onClick={goToLogin} className={gameFlowStyles.startGameFlowButton}>
          Register
        </button>
      </div>
    </div>
  );
};

export default BountyDetails;





