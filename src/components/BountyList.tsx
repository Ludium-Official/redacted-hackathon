import { useNavigate } from 'react-router-dom';
import gameFlowStyles from '../styles/GameFlow.module.scss';

const BountyList = () => {
  const navigate = useNavigate();

  const bounties = [
    { id: 'bounty1', title: 'Redacted Hackathon', reward: '$10,000', requirements: 'Build an innovative AI tool' },
    { id: 'bounty2', title: 'Blockchain Security Challenge', reward: '$8,000', requirements: 'Enhance blockchain security' },
    { id: 'bounty3', title: 'Decentralized Voting System', reward: '$5,000', requirements: 'Develop a voting protocol' },
    { id: 'bounty4', title: 'Data Privacy Enhancement', reward: '$7,500', requirements: 'Improve data privacy measures' },
    { id: 'bounty5', title: 'NFT Marketplace Plugin', reward: '$6,000', requirements: 'Build an NFT marketplace feature' },
    { id: 'bounty6', title: 'Crypto Wallet Integration', reward: '$9,000', requirements: 'Integrate with popular crypto wallets' },
    { id: 'bounty7', title: 'Smart Contract Optimization', reward: '$4,000', requirements: 'Optimize smart contract gas fees' },
    { id: 'bounty8', title: 'AI-Powered Analytics', reward: '$12,000', requirements: 'Create an AI analytics tool' },
    { id: 'bounty9', title: 'Cross-Chain Bridge Development', reward: '$15,000', requirements: 'Build a cross-chain bridge' },
    { id: 'bounty10', title: 'DeFi Lending Protocol', reward: '$20,000', requirements: 'Develop a DeFi lending platform' },
    { id: 'bounty11', title: 'Green Energy Blockchain', reward: '$10,000', requirements: 'Develop a green energy tracking system' },
    { id: 'bounty12', title: 'Digital Identity Verification', reward: '$7,500', requirements: 'Create a decentralized identity system' },
    { id: 'bounty13', title: 'Gaming NFT Integrations', reward: '$5,000', requirements: 'Enable NFTs for in-game assets' },
    { id: 'bounty14', title: 'Supply Chain Transparency', reward: '$9,000', requirements: 'Track products on the blockchain' },
    { id: 'bounty15', title: 'Healthcare Data Sharing', reward: '$10,000', requirements: 'Create a secure data-sharing protocol' },
  ];

  const goToBountyDetails = (bountyId: string) => {
    navigate(`/bounty/${bountyId}`);
  };

  return (
    <div className={gameFlowStyles.gameFlow}>
      <h1 className={gameFlowStyles.pageTitle}>Web3 Career Pathfinder</h1>
      <ul className={gameFlowStyles.bountyList}>
        {bounties.map(bounty => (
          <li
            key={bounty.id}
            onClick={() => goToBountyDetails(bounty.id)}
            className={gameFlowStyles.bountyItem}
          >
            <span className={gameFlowStyles.bountyTitle}>{bounty.title}</span>
            <span className={gameFlowStyles.bountyDetails}>{bounty.reward} - {bounty.requirements}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BountyList;


