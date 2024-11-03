use super::model::Role;
use near_sdk::{log, store::LookupMap, AccountId};

/// 역할 추가 함수
pub fn _add_role(
    roles: &mut LookupMap<String, Role>,
    role_name: String,
    description: Option<String>,
    assigned_users: Option<Vec<AccountId>>,
) {
    let role = Role {
        name: role_name.clone(),
        description,
        assigned_users,
    };
    roles.insert(role_name.clone(), role);
    log!("Role '{}' added successfully.", role_name);
}

/// 역할 조회 함수
pub fn _get_role(roles: &LookupMap<String, Role>, role_name: String) -> Option<&Role> {
    roles.get(&role_name)
}

/// 역할 업데이트 함수
pub fn _update_role(
    roles: &mut LookupMap<String, Role>,
    role_name: String,
    description: Option<String>,
    assigned_users: Option<Vec<AccountId>>,
) {
    if let Some(role) = roles.get(&role_name) {
        let mut tmp = role.clone();
        tmp.description = description;
        tmp.assigned_users = assigned_users;
        roles.insert(role_name.clone(), tmp);
        log!("Role '{}' updated successfully.", role_name);
    } else {
        log!("Role '{}' not found.", role_name);
    }
}

/// 역할 삭제 함수
pub fn _remove_role(roles: &mut LookupMap<String, Role>, role_name: String) {
    if roles.remove(&role_name).is_some() {
        log!("Role '{}' removed successfully.", role_name);
    } else {
        log!("Role '{}' not found.", role_name);
    }
}
