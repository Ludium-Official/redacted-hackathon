use near_sdk::{near, AccountId};

#[derive(Clone)]
#[near(serializers = [json, borsh])]
pub struct UserInfo {
    pub account: AccountId,
    pub email: String,
    pub name: String,
    pub provider: String,
    pub career: Career,
}

#[derive(Clone, Default)]
#[near(serializers = [json, borsh])]
pub struct Career {
    pub language: Vec<String>,
}
