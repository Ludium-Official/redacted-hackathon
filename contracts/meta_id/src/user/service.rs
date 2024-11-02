use super::model::UserInfo;
use near_sdk::{env, log, store::LookupMap, AccountId};

/// 사용자 추가 함수
pub fn add_user(
    users: &mut LookupMap<AccountId, UserInfo>,
    account: AccountId,
    email: String,
    name: String,
    provider: String,
) {
    let current_timestamp = env::block_timestamp();
    let user_info = UserInfo {
        account: account.clone(),
        email,
        name,
        provider,
        roles: vec![],
        created_at: current_timestamp,
        updated_at: current_timestamp,
    };
    users.insert(account.clone(), user_info);
    log!("User {} added successfully.", account);
}

/// 사용자 조회 함수
pub fn get_user(
    users: &LookupMap<AccountId, UserInfo>,
    account_id: AccountId,
) -> Option<&UserInfo> {
    users.get(&account_id)
}

/// 사용자 업데이트 함수
pub fn update_user(
    users: &mut LookupMap<AccountId, UserInfo>,
    account: AccountId,
    email: Option<String>,
    name: Option<String>,
    provider: Option<String>,
    roles: Option<Vec<String>>,
) {
    if let Some(user_info) = users.get(&account) {
        let mut tmp = user_info.clone();

        if let Some(new_email) = email {
            tmp.email = new_email;
        }
        if let Some(new_name) = name {
            tmp.name = new_name;
        }
        if let Some(new_provider) = provider {
            tmp.provider = new_provider;
        }
        if let Some(new_roles) = roles {
            tmp.roles = new_roles;
        }
        tmp.updated_at = env::block_timestamp();
        users.remove(&account);
        users.insert(account.clone(), tmp);
        log!("User {} updated successfully.", account);
    } else {
        log!("User {} not found.", account);
    }
}

/// 사용자 삭제 함수
pub fn remove_user(users: &mut LookupMap<AccountId, UserInfo>, account: AccountId) {
    if users.remove(&account).is_some() {
        log!("User {} removed successfully.", account);
    } else {
        log!("User {} not found.", account);
    }
}
