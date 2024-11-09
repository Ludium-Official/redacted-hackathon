use near_sdk::{env, log, near, store::LookupMap, AccountId};
use serde::{Deserialize, Serialize};
use std::str::FromStr;

#[derive(Clone)]
#[near(serializers = [json, borsh])]
pub struct UserInfo {
    pub account: AccountId,
    pub email: String,
    pub name: String,
    pub provider: String,
    pub career: CareerDB,
}

#[derive(Clone)]
#[near(serializers = [json, borsh])]
pub struct CareerDB {
    pub top_skills: Vec<String>,
    pub followers: u64,
    pub roles: Vec<String>,
    pub contributions: u64,
}

// Contract definition with `users` field of type `LookupMap`
#[near(contract_state)]
pub struct Contract {
    pub users: LookupMap<AccountId, UserInfo>,
}

impl Default for Contract {
    fn default() -> Self {
        let mut contract = Self {
            users: LookupMap::new(b"u"),
        };

        // Add 9 dummy users
        contract.users.insert(
            AccountId::from_str("user1.testnet").unwrap(),
            UserInfo {
                account: AccountId::from_str("user1.testnet").unwrap(),
                email: "user1@example.com".to_string(),
                name: "Alice".to_string(),
                provider: "ProviderA".to_string(),
                career: CareerDB {
                    top_skills: vec!["Python".to_string(), "C++".to_string()],
                    followers: 500,
                    roles: vec!["Frontend".to_string()],
                    contributions: 1200,
                },
            },
        );

        contract.users.insert(
            AccountId::from_str("user2.testnet").unwrap(),
            UserInfo {
                account: AccountId::from_str("user2.testnet").unwrap(),
                email: "user2@example.com".to_string(),
                name: "Bob".to_string(),
                provider: "ProviderB".to_string(),
                career: CareerDB {
                    top_skills: vec!["Java".to_string(), "Haskell".to_string()],
                    followers: 1500,
                    roles: vec!["Backend".to_string()],
                    contributions: 3000,
                },
            },
        );

        contract.users.insert(
            AccountId::from_str("user3.testnet").unwrap(),
            UserInfo {
                account: AccountId::from_str("user3.testnet").unwrap(),
                email: "user3@example.com".to_string(),
                name: "Charlie".to_string(),
                provider: "ProviderC".to_string(),
                career: CareerDB {
                    top_skills: vec!["TypeScript".to_string(), "Rust".to_string()],
                    followers: 3000,
                    roles: vec!["SmartContract".to_string()],
                    contributions: 1500,
                },
            },
        );

        contract.users.insert(
            AccountId::from_str("user4.testnet").unwrap(),
            UserInfo {
                account: AccountId::from_str("user4.testnet").unwrap(),
                email: "user4@example.com".to_string(),
                name: "David".to_string(),
                provider: "ProviderA".to_string(),
                career: CareerDB {
                    top_skills: vec!["C#".to_string(), "Go".to_string()],
                    followers: 700,
                    roles: vec!["Frontend".to_string()],
                    contributions: 2000,
                },
            },
        );

        contract.users.insert(
            AccountId::from_str("user5.testnet").unwrap(),
            UserInfo {
                account: AccountId::from_str("user5.testnet").unwrap(),
                email: "user5@example.com".to_string(),
                name: "Eve".to_string(),
                provider: "ProviderB".to_string(),
                career: CareerDB {
                    top_skills: vec!["Swift".to_string(), "Kotlin".to_string()],
                    followers: 1200,
                    roles: vec!["Backend".to_string()],
                    contributions: 5000,
                },
            },
        );

        contract.users.insert(
            AccountId::from_str("user6.testnet").unwrap(),
            UserInfo {
                account: AccountId::from_str("user6.testnet").unwrap(),
                email: "user6@example.com".to_string(),
                name: "Frank".to_string(),
                provider: "ProviderC".to_string(),
                career: CareerDB {
                    top_skills: vec!["JavaScript".to_string(), "Ruby".to_string()],
                    followers: 4500,
                    roles: vec!["SmartContract".to_string()],
                    contributions: 8000,
                },
            },
        );

        contract.users.insert(
            AccountId::from_str("user7.testnet").unwrap(),
            UserInfo {
                account: AccountId::from_str("user7.testnet").unwrap(),
                email: "user7@example.com".to_string(),
                name: "Grace".to_string(),
                provider: "ProviderA".to_string(),
                career: CareerDB {
                    top_skills: vec!["Scala".to_string(), "Elixir".to_string()],
                    followers: 1000,
                    roles: vec!["Frontend".to_string()],
                    contributions: 1100,
                },
            },
        );

        contract.users.insert(
            AccountId::from_str("user8.testnet").unwrap(),
            UserInfo {
                account: AccountId::from_str("user8.testnet").unwrap(),
                email: "user8@example.com".to_string(),
                name: "Hank".to_string(),
                provider: "ProviderB".to_string(),
                career: CareerDB {
                    top_skills: vec!["Rust".to_string(), "C++".to_string()],
                    followers: 8000,
                    roles: vec!["Backend".to_string()],
                    contributions: 10000,
                },
            },
        );

        contract.users.insert(
            AccountId::from_str("user9.testnet").unwrap(),
            UserInfo {
                account: AccountId::from_str("user9.testnet").unwrap(),
                email: "user9@example.com".to_string(),
                name: "Ivy".to_string(),
                provider: "ProviderC".to_string(),
                career: CareerDB {
                    top_skills: vec!["Python".to_string(), "Haskell".to_string()],
                    followers: 2500,
                    roles: vec!["SmartContract".to_string()],
                    contributions: 30000,
                },
            },
        );

        contract
    }
}

#[near]
impl Contract {
    pub fn hello() -> String {
        String::from("YES GOT IT")
    }

    #[payable]
    pub fn add_career(&mut self, account_id: AccountId, career_data: CareerDB) -> String {
        if let Some(user_info) = self.users.get(&account_id) {
            let mut tmp = user_info.clone();

            tmp.career = career_data;

            self.users.insert(account_id.clone(), tmp.clone());

            log!("Career data updated for user {}", account_id);
            String::from("Career data added successfully")
        } else {
            String::from("User not found")
        }
    }

    #[payable]
    pub fn add_user(
        &mut self,
        account: AccountId,
        email: String,
        name: String,
        provider: String,
    ) -> String {
        let user_info = UserInfo {
            account: account.clone(),
            email,
            name,
            provider,
            career: CareerDB {
                top_skills: Vec::new(),
                followers: 0,
                roles: Vec::new(),
                contributions: 0,
            },
        };
        self.users.insert(account.clone(), user_info);
        log!("User {} added successfully.", account);
        String::from("User added successfully")
    }

    pub fn get_user(&self, account_id: AccountId) -> Option<UserInfo> {
        self.users.get(&account_id).cloned() // Use cloned() to return an owned UserInfo
    }
}
