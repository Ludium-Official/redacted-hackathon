import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import BountyList from './components/BountyList';
import BountyDetails from './components/BountyDetails';
import BitteLogin from './components/BitteLogin';
import CareerVerification from './components/CareerVerification';
import GithubVerification from './components/GithubVerification';
import RequestMatch from './components/RequestMatch';
import MatchResult from './components/MatchResult';
import BountyApproval from './components/BountyApproval';
import SubmitWork from './components/SubmitWork';
import LLMHackathonJudging from './components/LLMHackathonJudging';
import RewardDistribution from './components/RewardDistribution';
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/bounties" replace />} />
        <Route path="/bounties" element={<BountyList />} />
        <Route path="/bounty/:bountyId" element={<BountyDetails />} />
        <Route path="/login" element={<BitteLogin />} />
        <Route path="/career-verification" element={<CareerVerification />} />
        <Route path="/github-verification" element={<GithubVerification />} />
        <Route path="/request-match" element={<RequestMatch />} />
        <Route path="/match-result" element={<MatchResult />} /> {/* MatchResult route */}
        <Route path="/bounty-approval" element={<BountyApproval />} />
        <Route path="/submit-work" element={<SubmitWork />} />
        <Route path="/llm-hackathon-judging" element={<LLMHackathonJudging />} />
        <Route path="/reward-distribution" element={<RewardDistribution />} />
      </Routes>
    </Router>
  );
};

export default App;






