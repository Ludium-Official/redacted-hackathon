use serde_json::json;

#[tokio::test]
async fn test_contract_is_operational() -> Result<(), Box<dyn std::error::Error>> {
    let sandbox = near_workspaces::sandbox().await?;
    let contract_wasm = near_workspaces::compile_project("./").await?;

    let contract = sandbox.dev_deploy(&contract_wasm).await?;
    let user_account = sandbox.dev_create_account().await?;

    let outcome = user_account.call(contract.id(), "hello").transact().await?;
    assert!(outcome.is_success());
    Ok(())
}

#[tokio::test]
async fn test_add_user() -> Result<(), Box<dyn std::error::Error>> {
    let sandbox = near_workspaces::sandbox().await?;
    let contract_wasm = near_workspaces::compile_project("./").await?;

    let contract = sandbox.dev_deploy(&contract_wasm).await?;
    let user_account = sandbox.dev_create_account().await?;

    let outcome = user_account
        .call(contract.id(), "add_user_wrapper")
        .args_json(json!({
            "account": "user1.near",
            "email": "user1@example.com",
            "name": "User One",
            "provider": "ProviderA"
        }))
        .transact()
        .await?;
    assert!(outcome.is_success());
    Ok(())
}

#[tokio::test]
async fn test_get_user() -> Result<(), Box<dyn std::error::Error>> {
    let sandbox = near_workspaces::sandbox().await?;
    let contract_wasm = near_workspaces::compile_project("./").await?;

    let contract = sandbox.dev_deploy(&contract_wasm).await?;
    let user_account = sandbox.dev_create_account().await?;

    let _ = user_account
        .call(contract.id(), "add_user_wrapper")
        .args_json(json!({
            "account": "user3.near",
            "email": "user1@example.com",
            "name": "User One",
            "provider": "ProviderA"
        }))
        .transact()
        .await?;

    let outcome = contract
        .view("get_user_wrapper")
        .args_json(json!({ "account_id": "user3.near" }))
        .await?;
    let user: serde_json::Value = outcome.json()?;
    assert_eq!(user["email"], "user1@example.com");
    assert_eq!(user["name"], "User One");
    assert_eq!(user["provider"], "ProviderA");
    Ok(())
}

#[tokio::test]
async fn test_update_user() -> Result<(), Box<dyn std::error::Error>> {
    let sandbox = near_workspaces::sandbox().await?;
    let contract_wasm = near_workspaces::compile_project("./").await?;

    let contract = sandbox.dev_deploy(&contract_wasm).await?;
    let user_account = sandbox.dev_create_account().await?;

    let _ = user_account
        .call(contract.id(), "add_user_wrapper")
        .args_json(json!({
            "account": "user1.near",
            "email": "user1@example.com",
            "name": "User One",
            "provider": "ProviderA"
        }))
        .transact()
        .await?;

    let update_outcome = user_account
        .call(contract.id(), "update_user_wrapper")
        .args_json(json!({
            "account": "user1.near",
            "email": "user1_updated@example.com",
            "name": "User One Updated",
            "provider": "ProviderB",
            "roles": []
        }))
        .transact()
        .await?;
    assert!(update_outcome.is_success());

    let outcome = contract
        .view("get_user_wrapper")
        .args_json(json!({ "account_id": "user1.near" }))
        .await?;
    let user: serde_json::Value = outcome.json()?;
    assert_eq!(user["email"], "user1_updated@example.com");
    assert_eq!(user["name"], "User One Updated");
    assert_eq!(user["provider"], "ProviderB");
    Ok(())
}

#[tokio::test]
async fn test_add_role() -> Result<(), Box<dyn std::error::Error>> {
    let sandbox = near_workspaces::sandbox().await?;
    let contract_wasm = near_workspaces::compile_project("./").await?;

    let contract = sandbox.dev_deploy(&contract_wasm).await?;
    let user_account = sandbox.dev_create_account().await?;

    let outcome = user_account
        .call(contract.id(), "add_role_wrapper")
        .args_json(json!({
            "role_name": "admin",
            "description": "Administrator role",
            "assigned_users": []
        }))
        .transact()
        .await?;
    assert!(outcome.is_success());
    Ok(())
}

#[tokio::test]
async fn test_assign_role_to_user() -> Result<(), Box<dyn std::error::Error>> {
    let sandbox = near_workspaces::sandbox().await?;
    let contract_wasm = near_workspaces::compile_project("./").await?;

    let contract = sandbox.dev_deploy(&contract_wasm).await?;
    let user_account = sandbox.dev_create_account().await?;

    let _ = user_account
        .call(contract.id(), "add_user_wrapper")
        .args_json(json!({
            "account": "user1.near",
            "email": "user1@example.com",
            "name": "User One",
            "provider": "ProviderA"
        }))
        .transact()
        .await?;

    let _ = user_account
        .call(contract.id(), "add_role_wrapper")
        .args_json(json!({
            "role_name": "admin",
            "description": "Administrator role",
            "assigned_users": []
        }))
        .transact()
        .await?;

    let outcome = user_account
        .call(contract.id(), "add_role_to_user")
        .args_json(json!({ "user_id": "user1.near", "role_name": "admin" }))
        .transact()
        .await?;
    assert!(outcome.is_success());
    Ok(())
}
