use near_sdk::{near, AccountId};

#[derive(Clone)]
#[near(serializers = [json, borsh])]
pub struct Role {
    pub name: String,
    pub description: Option<String>,
    pub assigned_users: Option<Vec<AccountId>>,
}
