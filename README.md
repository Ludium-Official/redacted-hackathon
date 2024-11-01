# [Ludium] Web3 Builder Matching System

## Overview
Ludium is a Web3 builder commutunity in Korea that provides career opportunities for builders through educaiton, contents, bounties, and grants. In Web3 industry, hackathons serve as a great segway to onbaord new talents. However, from the beginner's perspective, it is hard to find a team, recieve feedbacks, and wait for the prize settlemtent. Ludium offers a AI based Web3 builder matching system that analyze the builder's skill set, assign teams, judge reulsts and settle payment through autnomous system.       

## Problem
![Problem](https://github.com/Ludium-Official/redacted-hackathon/blob/main/images/problem.png?raw=true)
According to [the statistics](https://www.risein.com/blog/are-web3-hackathons-truly-effective-a-critical-examination), there is 4.4m $USD spent on prizes for hackathons during Q1 2024 through Dorahacks platform alone. It is needless to say that hackathons are the primary funnels for onbaording the new talents onto Web3. However, from the experience of the beginner, there are three challendges
1. It is difficult to **find a team who can provide complementary skills** for the successful hackathon. Practially speaking it requires more than one developer, much more likely to invovle skill sets including business developers and designers, for a quality project to come out.   
2. During the hackathon, teams rarely **recieve proper feedback** to further develop the project. In extreme cases, judgement results are not transparent enough for teams to know how their projects were viewed as supposed to the other projects.
3. After the hackathon is over, **the prize settlment usually takes too long** which leaves terrible impression on Foundationa and Web3 industry in general. From KYC to the actual payment, it may take months before the settlement.
For some builders, one unpleasant experience deters their entire carrier journey into Web3. From the talent acquisition and retention point of view, there are rooms for improvement.

## Solution
![builder-matching-system](https://github.com/Ludium-Official/redacted-hackathon/blob/main/images/Builder%20matching%20system.png?raw=true)
Ludium propose a Web3 Builder Matching System that consists of the following features: 
1. **Talent Analysis**: Collect individual builder's data from diverse sources (ex. Github) to analyze and assess the individual skill sets
2. **Team Matching**: Assign builders based on the talent analysis to the most optimized tasks. It may involve team works in which case the positions are assigned based on the requirement and individual skill sets
3. **Automated Judgement**: Based on the set criteria and the projects submitted automated asgent assess the project to determine the best project
4. **Onchain Contract Enforcement**: Validate the work provided by the builder. For all tasks assigned, the payment amount is deposited in advance. The payment is settled when the work is validated
 

## Technical Breakdown
![BMS Redacted Overview](https://github.com/Ludium-Official/redacted-hackathon/blob/main/images/redacted.png?raw=true)

Ludium's pathfinder consists of three core pillars
1. **Onchain Builder Profile**: Onchain Self Sovereign ID(SSI) that stores builder data. It interacts with offchain data (ex. Github) using Reclaim Protocol's zkTLS data entry SDK
2. **Mathcing Agent**: AI Agent that process the skill sets and matches the team based on the different skill sets
3. **Task Assessment Agent**: AI agent that judges the submitted project based on the set criteria from the requirement
4. **Onchain Prize Contract**: Onchain contract that holds the deposits for the hackathon prizes and distribute it when the team chooses the payment. It utilizes Chain Abstraction by Near so that pools can be set up in anychain(currently Ethereum / Near) whereas one treasury can be used for the settlement

## Use Cases
Beyond hackathon, there are three potential usecases for the system 
1. **Education**: Based on the level of skill on the profile, one can be matched to an educational program or a program manager. The recommended program can not only be targeted to enhance the pre-existing skill but also to acquire new skills that were previously not found 
2. **Recruiting**: Foundations and corporations can put up bounties with tasks to search and recruit builders needed. Recruiting could be full time job, in which case the bounty is for head hunting / referral whereas for the freelancing, the bounty can be for the task completion itself
3. **Incubation**: The current grants are structured around RFPs that requests for products and services to boost the ecosystem. Individuals and teams can be matched with an incubator so that projects can submit proposal, negotiate on the terms and conditions especially around an agreeable milestones, deliver the results, and receive payment for the completion

## Points for Improvement
1. **Wider Data Sets**: For the purpose of this hackathon, we activated github as the primary source of data for analysis. The scope is limited to developers with skills on frontend, backend, and contract. However, with more data entry points, such as linkedin or other educational backgrounds, so that wider range of skill sets can be taken into account for matching
2. **Project Advisory**: Task assessment agent is used only for the final judgement of the hackathon. However, theoreticaly, the assessment can happen anytime during the whole operation. In which case, the agent can serve as a project advisory or assistance
3. **Dynamic Incentive Distribution**: Onchain incentive distribution can be improve once the assessment for the individual contributions are quantified. Based on the results, more dynamic versions of retro active distribution can be possible.

## Team
1. **Agwn**: Agwn is the founder of Ludium and manages [10 + projects](https://github.com/Ludium-Official) for different foundations. The idea is later to be implemented into the Ludium Portal so that autonomous builder community collaboration can happen 
2. **tchoi**: [tchoi](https://github.com/choidev617) is the frontend developer and LLM agent developer. He worked as a AI engineer for Ministry of Culture, Sports and Tourism and participated in Near Horizon AI hackathon in Korea during September 
3. **Hugo**: [Hugo](https://github.com/energyGiver) is the backend developer setting up Reclaim Protocol SDK, data structure and managing the overall system architecture. He is leading the developement side
4. **c0np4nn4**: [c0np4nn4](https://github.com/c0np4nn4) is the contract developer setting up onchain ID and prize contract on Near. He is also working on Chain Abstraction features to connect prizes in Ethereum and Near
