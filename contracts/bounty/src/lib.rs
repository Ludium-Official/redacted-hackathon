use near_sdk::{env, log, near, AccountId, NearToken, Promise};
use std::str::FromStr;

pub type Balance = u64;
pub type TeamId = u64;
pub type Team = Vec<AccountId>;

#[derive(Clone)]
#[near(serializers = [json, borsh])]
pub struct Bounty {
    // bounty id
    pub id: String,
    // bounty title
    pub title: String,
    pub description: String,
    pub host: AccountId,
    pub reward_wei: Balance,
    pub requirements: String,
    pub applicants: Vec<AccountId>,
    pub team: Option<Vec<Vec<AccountId>>>,
    pub is_claimed: bool,
    pub created_at: u64,
    pub updated_at: u64,
}

#[near(contract_state)]
pub struct Contract {
    pub bounties: Vec<Bounty>,
}

fn get_dummy_bounties() -> Vec<Bounty> {
    vec![
        Bounty {
            id: "bounty1".to_string(),
            title: "Redacted Hackathon".to_string(),
            description: "An event focused on creating innovative AI solutions.".to_string(),
            host: AccountId::from_str("host1.testnet").unwrap(),
            reward_wei: 10_000,
            requirements: "Build an innovative AI tool".to_string(),
            applicants: Vec::new(),
            team: None,
            is_claimed: false,
            created_at: 0,
            updated_at: 0,
        },
        Bounty {
            id: "bounty2".to_string(),
            title: "Blockchain Security Challenge".to_string(),
            description: "Enhance the security of blockchain applications.".to_string(),
            host: AccountId::from_str("host2.testnet").unwrap(),
            reward_wei: 8_000,
            requirements: "Enhance blockchain security".to_string(),
            applicants: Vec::new(),
            team: None,
            is_claimed: false,
            created_at: 0,
            updated_at: 0,
        },
        Bounty {
            id: "bounty3".to_string(),
            title: "Decentralized Voting System".to_string(),
            description: "Develop a secure decentralized voting protocol.".to_string(),
            host: AccountId::from_str("host3.testnet").unwrap(),
            reward_wei: 5_000,
            requirements: "Develop a voting protocol".to_string(),
            applicants: Vec::new(),
            team: None,
            is_claimed: false,
            created_at: 0,
            updated_at: 0,
        },
        Bounty {
            id: "bounty4".to_string(),
            title: "Data Privacy Enhancement".to_string(),
            description: "Improve privacy measures for sensitive data.".to_string(),
            host: AccountId::from_str("host4.testnet").unwrap(),
            reward_wei: 7_500,
            requirements: "Improve data privacy measures".to_string(),
            applicants: vec![AccountId::from_str("whoami.testnet").unwrap()],
            team: None,
            is_claimed: false,
            created_at: 0,
            updated_at: 0,
        },
        Bounty {
            id: "bounty5".to_string(),
            title: "NFT Marketplace Plugin".to_string(),
            description: "Build a plugin feature for an NFT marketplace.".to_string(),
            host: AccountId::from_str("host5.testnet").unwrap(),
            reward_wei: 6_000,
            requirements: "Build an NFT marketplace feature".to_string(),
            applicants: Vec::new(),
            team: None,
            is_claimed: false,
            created_at: 0,
            updated_at: 0,
        },
        Bounty {
            id: "bounty6".to_string(),
            title: "Crypto Wallet Integration".to_string(),
            description: "Integrate a solution with popular crypto wallets.".to_string(),
            host: AccountId::from_str("host6.testnet").unwrap(),
            reward_wei: 9_000,
            requirements: "Integrate with popular crypto wallets".to_string(),
            applicants: Vec::new(),
            team: None,
            is_claimed: false,
            created_at: 0,
            updated_at: 0,
        },
    ]
}

impl Default for Contract {
    fn default() -> Self {
        let contract = Self {
            bounties: get_dummy_bounties(),
        };

        contract
    }
}

#[near]
impl Contract {
    pub fn distribute_reward(
        //
        &mut self,
        bounty_id: u64,
        ranks: Vec<u64>,
    ) {
        let mut bounty = match self.bounties.get_mut(bounty_id as usize) {
            Some(bounty) => bounty,
            None => {
                log!("Bounty {} not found.", bounty_id);
                return;
            }
        };

        assert_eq!(
            env::predecessor_account_id(),
            bounty.host,
            "Only the host can distribute the reward."
        );

        assert!(!bounty.is_claimed, "The reward has already been claimed.");

        let reward_ratios = vec![10, 6, 4];
        let total_ratio: u64 = reward_ratios.iter().sum();

        if let Some(team) = &bounty.team {
            if ranks.len() != team.len() {
                log!("Ranks length does not match number of teams.");
                return;
            }

            let total_reward = NearToken::from_yoctonear(bounty.reward_wei as u128);
            for (idx, members) in team.iter().enumerate() {
                if let Some(rank) = ranks.get(idx) {
                    let ratio = reward_ratios[rank.clone() as usize];
                    let reward_for_team =
                        total_reward.as_yoctonear() * ratio as u128 / total_ratio as u128;
                    let reward_per_member = reward_for_team / members.len() as u128;

                    for member in members {
                        Promise::new(member.clone())
                            .transfer(NearToken::from_yoctonear(reward_per_member));
                    }
                }
            }
        } else {
            log!("No team assigned to the bounty.");
            return;
        }

        bounty.is_claimed = true;
        bounty.updated_at = env::block_timestamp();

        log!("Reward for Bounty {} distributed successfully.", bounty_id);
    }

    pub fn get_bounty(&self, bounty_id: u64) -> Option<Bounty> {
        self.bounties.get(bounty_id as usize).cloned()
    }

    pub fn add_applicant(&mut self, bounty_id: u64, applicant: AccountId) {
        let mut bounty = match self.bounties.get_mut(bounty_id as usize) {
            Some(bounty) => bounty,
            None => {
                log!("Bounty {} not found.", bounty_id);
                return;
            }
        };

        assert!(
            bounty.applicants.len() < 10,
            "Maximum number of applicants reached."
        );

        if !bounty.applicants.contains(&applicant) {
            bounty.applicants.push(applicant);
            bounty.updated_at = env::block_timestamp();
            log!("Applicant added to Bounty {} successfully.", bounty_id);
        } else {
            log!("Applicant is already part of Bounty {}.", bounty_id);
        }
    }

    pub fn assign_team_to_bounty(&mut self, bounty_id: u64, teams: Vec<Team>) {
        let mut bounty = match self.bounties.get_mut(bounty_id as usize) {
            Some(bounty) => bounty,
            None => {
                log!("Bounty {} not found.", bounty_id);
                return;
            }
        };

        bounty.team = Some(teams);
        bounty.updated_at = env::block_timestamp();

        log!("Team assigned to Bounty {} successfully.", bounty_id);
    }

    pub fn get_all_applicants(&self, bounty_id: u64) -> Option<Vec<AccountId>> {
        match self.bounties.get(bounty_id as usize) {
            Some(bounty) => Some(bounty.applicants.clone()),
            None => {
                log!("Bounty {} not found.", bounty_id);
                None
            }
        }
    }
}
