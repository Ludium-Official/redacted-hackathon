use near_sdk::{near, AccountId};

use crate::Balance;
pub type TeamId = u64;

/// from metaId contract
// #[derive(Clone)]
// #[near(serializers = [json, borsh])]
// pub struct UserInfo {
//     pub account: AccountId,
//     pub email: String,
//     pub name: String,
//     pub provider: String,
//     pub roles: Vec<String>,
//     pub created_at: u64,
//     pub updated_at: u64,
// }

#[derive(Clone)]
#[near(serializers = [json, borsh])]
pub struct Team {
    pub team_id: TeamId,
    pub members: Vec<AccountId>,
}
