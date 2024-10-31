# [Ludium] Web3 Builder Matching System

## Overview
Ludium is a Web3 builder commutunity in Korea that provides career opportunities for builders through educaiton, contents, bounties, and grants. In Web3 industry, hackathons serve as a great segway to onbaord new talents. However, from the beginner's perspective, it is hard to find a team, recieve feedbacks, and wait for the prize settlemtent. Ludium offers a AI based Web3 builder matching system that analyze the builder's skill set, assign teams, judge reulsts and settle payment through autnomous system.       

## Problem
According to [the statistics](https://www.risein.com/blog/are-web3-hackathons-truly-effective-a-critical-examination), there is 4.4m $USD spent on prizes for hackathons during Q1 2024 through Dorahacks platform alone. It is needless to say that hackathons are the primary funnels for onbaording the new talents onto Web3. However, from the experience of the beginner, there are three challendges
1. It is difficult to **find a team who can provide complementary skills** for the successful hackathon. Practially speaking it requires more than one developer, much more likely to invovle skill sets including business developers and designers, for a quality project to come out.   
2. During the hackathon, teams rarely **recieve proper feedback** to further develop the project. In extreme cases, judgement results are not transparent enough for teams to know how their projects were viewed as supposed to the other projects.
3. After the hackathon is over, **the prize settlment usually takes too long** which leaves terrible impression on Foundationa and Web3 industry in general. From KYC to the actual payment, it may take months before the settlement.
For some builders, one unpleasant experience deters their entire carrier journey into Web3. From the talent acquisition and retention point of view, there are rooms for improvement.

## Solution
**(Demo Video / Screenshot)**

Ludium propose a Web3 Builder Matching System that consists of the following features: 
1. **Talent Analysis**: Collect individual builder's data from diverse sources (ex. Github) to analyze and assess the individual skill sets
2. **Team Matching**: Assign builders based on the talent analysis to the most optimized tasks. It may involve team works in which case the positions are assigned based on the requirement and individual skill sets
3. **Automated Judgement**: Based on the set criteria and the projects submitted automated asgent assess the project to determine the best project
4. **Onchain Contract Enforcement**: Validate the work provided by the builder. For all tasks assigned, the payment amount is deposited in advance. The payment is settled when the work is validated
 

## Technical Breakdown
![BMS Redacted Overview](https://github.com/Ludium-Official/redacted-hackathon/blob/main/images/redacted.png?raw=true)

Ludium's pathfinder consists of three core pillars
1. **Onchain Builder Profile**: Onchain Self Sovereign ID(SSI) that stores builder data. It interacts with offchain data (ex. Github) using Reclaim Protocol's zkTLS data entry SDK
2. **Mathcing Agent**: AI Agent that process the skill sets and matches 
3. **Task Assessment Agent**: AI agent that analyzes skill sets, assign tasks, and assess the work for verfication 
4. **Onchain Prize Contract**: Onchain contract that holds the deposits for the hackathon prizes and distribute it when the team chooses the payment 

## Use Cases
Although  

## Road Map
1. Talent Analysis
2. Matching Agent
3. Automated Judgement
4. Onchain Prize Contract

## Team
