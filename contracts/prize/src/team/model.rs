use near_sdk::{near, AccountId};

use crate::Balance;
pub type TeamId = u64;

#[derive(Clone)]
#[near(serializers = [json, borsh])]
pub struct Team {
    pub team_id: TeamId,
    pub members: Vec<AccountId>,
}
