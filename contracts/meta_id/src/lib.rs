mod user;

use crate::user::{
    model::UserInfo,
    service::{_add_user, _get_user},
};
use near_sdk::{near, store::LookupMap, AccountId};
use std::str::FromStr;
use user::model::Career;

#[near(contract_state)]
pub struct Contract {
    pub users: LookupMap<AccountId, UserInfo>,
}

impl Default for Contract {
    fn default() -> Contract {
        let mut contract = Self {
            users: LookupMap::new(b"u"),
        };

        // 임의의 사용자 추가
        _add_user(
            &mut contract.users,
            AccountId::from_str("user1.near").unwrap(),
            "user1@example.com".to_string(),
            "Alice".to_string(),
            "ProviderA".to_string(),
        );
        _add_user(
            &mut contract.users,
            AccountId::from_str("user2.near").unwrap(),
            "user2@example.com".to_string(),
            "Brian".to_string(),
            "ProviderB".to_string(),
        );

        contract
    }
}

#[near]
impl Contract {
    pub fn hello() -> String {
        return String::from("YES GOT IT");
    }

    #[payable]
    pub fn add_career(
        //
        &mut self,
        career_info: Career,
    ) -> String {
        //
        return String::from("add_career called");
    }

    /// 사용자 추가 래퍼 함수
    #[payable]
    pub fn add_user(
        &mut self,
        account: AccountId,
        email: String,
        name: String,
        provider: String,
    ) -> String {
        _add_user(//
            &mut self.users, account, email, name, provider);
        return String::from("add_career called");
    }

    /// 사용자 조회 래퍼 함수
    pub fn get_user(&self, account_id: AccountId) -> Option<&UserInfo> {
        _get_user(&self.users, account_id)
    }

    // /// 사용자 업데이트 래퍼 함수
    // #[payable]
    // pub fn update_user(
    //     &mut self,
    //     account: AccountId,
    //     email: Option<String>,
    //     name: Option<String>,
    //     provider: Option<String>,
    // ) {
    //     _update_user(&mut self.users, account, email, name, provider);
    // }

    // /// 사용자 삭제 래퍼 함수
    // #[payable]
    // pub fn remove_user(&mut self, account: AccountId) {
    //     _remove_user(&mut self.users, account);
    // }
}
