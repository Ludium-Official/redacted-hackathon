mod role;
mod user;

use crate::{
    role::{
        model::Role,
        service::{add_role, get_role, remove_role, update_role},
    },
    user::{
        model::UserInfo,
        service::{add_user, get_user, remove_user, update_user},
    },
};
use near_sdk::{log, near, store::LookupMap, AccountId};
use std::str::FromStr;

#[near(contract_state)]
pub struct Contract {
    pub users: LookupMap<AccountId, UserInfo>,
    pub roles: LookupMap<String, Role>,
}

impl Default for Contract {
    fn default() -> Contract {
        let mut contract = Self {
            users: LookupMap::new(b"u"),
            roles: LookupMap::new(b"r"),
        };

        // 임의의 사용자 추가
        add_user(
            &mut contract.users,
            AccountId::from_str("user1.near").unwrap(),
            "user1@example.com".to_string(),
            "User One".to_string(),
            "ProviderA".to_string(),
        );
        add_user(
            &mut contract.users,
            AccountId::from_str("user2.near").unwrap(),
            "user2@example.com".to_string(),
            "User Two".to_string(),
            "ProviderB".to_string(),
        );

        // 임의의 역할 추가
        add_role(
            &mut contract.roles,
            "admin".to_string(),
            Some("Administrator role".to_string()),
            Some(vec![AccountId::from_str("user1.near").unwrap()]),
        );

        add_role(
            &mut contract.roles,
            "editor".to_string(),
            Some("Editor role".to_string()),
            None,
        );

        contract
    }
}

#[near]
impl Contract {
    pub fn hello() -> String {
        return String::from("YES GOT IT");
    }

    /// 사용자 추가 래퍼 함수
    #[payable]
    pub fn add_user_wrapper(
        &mut self,
        account: AccountId,
        email: String,
        name: String,
        provider: String,
    ) {
        add_user(&mut self.users, account, email, name, provider);
    }

    /// 사용자 조회 래퍼 함수
    pub fn get_user_wrapper(&self, account_id: AccountId) -> Option<&UserInfo> {
        get_user(&self.users, account_id)
    }

    /// 사용자 업데이트 래퍼 함수
    #[payable]
    pub fn update_user_wrapper(
        &mut self,
        account: AccountId,
        email: Option<String>,
        name: Option<String>,
        provider: Option<String>,
        roles: Option<Vec<String>>,
    ) {
        update_user(&mut self.users, account, email, name, provider, roles);
    }

    /// 사용자 삭제 래퍼 함수
    #[payable]
    pub fn remove_user_wrapper(&mut self, account: AccountId) {
        remove_user(&mut self.users, account);
    }

    /// 역할 추가 래퍼 함수
    #[payable]
    pub fn add_role_wrapper(
        &mut self,
        role_name: String,
        description: Option<String>,
        assigned_users: Option<Vec<AccountId>>,
    ) {
        add_role(&mut self.roles, role_name, description, assigned_users);
    }

    /// 역할 조회 래퍼 함수
    pub fn get_role_wrapper(&self, role_name: String) -> Option<&Role> {
        get_role(&self.roles, role_name)
    }

    /// 역할 업데이트 래퍼 함수
    #[payable]
    pub fn update_role_wrapper(
        &mut self,
        role_name: String,
        description: Option<String>,
        assigned_users: Option<Vec<AccountId>>,
    ) {
        update_role(&mut self.roles, role_name, description, assigned_users);
    }

    /// 역할 삭제 래퍼 함수
    #[payable]
    pub fn remove_role_wrapper(&mut self, role_name: String) {
        remove_role(&mut self.roles, role_name);
    }

    /// 역할을 사용자에게 할당하는 함수
    pub fn add_role_to_user(&mut self, user_id: AccountId, role_name: String) -> bool {
        let mut user = match self.users.get(&user_id) {
            Some(user) => user.clone(),
            None => {
                log!("User '{}' not found.", user_id);
                return false;
            }
        };

        let mut role = match self.roles.get(&role_name) {
            Some(role) => role.clone(),
            None => {
                log!("Role '{}' not found.", role_name);
                return false;
            }
        };

        if user.roles.contains(&role.name) {
            log!("User {} already has the role '{}'.", user_id, role_name);
            return false;
        }

        // 사용자에 역할 추가
        user.roles.push(role.name.clone());
        self.users.insert(user_id.clone(), user.clone());

        // 역할에 사용자 추가
        let mut users = role.assigned_users.unwrap_or_else(|| vec![]);
        users.push(user_id.clone());
        role.assigned_users = Some(users);
        self.roles.insert(role_name.clone(), role.clone());

        log!(
            "Role '{}' assigned to user {} successfully.",
            role_name,
            user_id
        );
        true
    }
}
