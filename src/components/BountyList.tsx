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
  ];

  const goToBountyDetails = (bountyId: string) => {
    navigate(`/bounty/${bountyId}`);
  };

  return (
    <div className={gameFlowStyles.gameFlow}>
      <h1 className={gameFlowStyles.pageTitle}>Builder Matching Systerm</h1>
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


