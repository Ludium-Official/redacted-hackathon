use near_sdk::{near, AccountId};

use crate::{team::model::TeamId, Balance};

#[derive(Clone)]
#[near(serializers = [json, borsh])]
pub struct Bounty {
    pub description: String,
    pub host: AccountId,
    pub reward_wei: Balance,
    pub join_teams: Option<Vec<TeamId>>,
    pub is_claimed: bool,
    pub total_amount: Balance,
    pub created_at: u64,
    pub updated_at: u64,
}
