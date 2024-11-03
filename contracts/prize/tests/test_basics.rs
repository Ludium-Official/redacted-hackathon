use near_workspaces::sandbox;
use serde_json::json;

/// This test checks if the bounty creation process is functioning properly.
/// It attempts to create a bounty and verifies whether the creation is successful.
#[tokio::test]
async fn test_create_bounty() -> Result<(), Box<dyn std::error::Error>> {
    let sandbox = sandbox().await?;
    let contract_wasm = near_workspaces::compile_project("./").await?;

    let contract = sandbox.dev_deploy(&contract_wasm).await?;
    let user_account = sandbox.dev_create_account().await?;

    let outcome = user_account
        .call(contract.id(), "create_bounty")
        .args_json(json!({
            "description": "Test Bounty",
            "host": "user1.near",
            "reward_wei": 1000
        }))
        .transact()
        .await?;
    assert!(outcome.is_success());
    Ok(())
}

/// This test verifies the process of retrieving a bounty.
/// It first creates a bounty and then checks if the bounty details can be retrieved correctly.
#[tokio::test]
async fn test_get_bounty() -> Result<(), Box<dyn std::error::Error>> {
    let sandbox = sandbox().await?;
    let contract_wasm = near_workspaces::compile_project("./").await?;

    let contract = sandbox.dev_deploy(&contract_wasm).await?;
    let user_account = sandbox.dev_create_account().await?;

    let _ = user_account
        .call(contract.id(), "create_bounty")
        .args_json(json!({
            "description": "Test Bounty",
            "host": "user1.near",
            "reward_wei": 1000
        }))
        .transact()
        .await?;

    let outcome = contract
        .view("get_bounty")
        .args_json(json!({ "bounty_id": 0 }))
        .await?;
    let bounty: serde_json::Value = outcome.json()?;
    assert_eq!(bounty["description"], "Test Bounty");
    assert_eq!(bounty["reward_wei"], 1000);
    Ok(())
}

/// This test ensures that updating a bounty works as expected.
/// It first creates a bounty, updates it, and then verifies if the changes have been applied.
#[tokio::test]
async fn test_update_bounty() -> Result<(), Box<dyn std::error::Error>> {
    let sandbox = sandbox().await?;
    let contract_wasm = near_workspaces::compile_project("./").await?;

    let contract = sandbox.dev_deploy(&contract_wasm).await?;
    let user_account = sandbox.dev_create_account().await?;

    let _ = user_account
        .call(contract.id(), "create_bounty")
        .args_json(json!({
            "description": "Test Bounty",
            "host": "user1.near",
            "reward_wei": 1000
        }))
        .transact()
        .await?;

    let outcome = user_account
        .call(contract.id(), "update_bounty")
        .args_json(json!({
            "bounty_id": 0,
            "description": "Updated Bounty",
            "reward_wei": 1500,
            "join_teams": null
        }))
        .transact()
        .await?;
    assert!(outcome.is_success());

    let updated_bounty = contract
        .view("get_bounty")
        .args_json(json!({ "bounty_id": 0 }))
        .await?;
    let bounty: serde_json::Value = updated_bounty.json()?;
    assert_eq!(bounty["description"], "Updated Bounty");
    assert_eq!(bounty["reward_wei"], 1500);
    Ok(())
}

/// This test ensures that claiming a bounty works correctly.
/// It first creates a bounty and then attempts to claim it, checking for successful execution.
#[tokio::test]
async fn test_claim_bounty() -> Result<(), Box<dyn std::error::Error>> {
    let sandbox = sandbox().await?;
    let contract_wasm = near_workspaces::compile_project("./").await?;

    let contract = sandbox.dev_deploy(&contract_wasm).await?;
    let user_account = sandbox.dev_create_account().await?;

    let _ = user_account
        .call(contract.id(), "create_bounty")
        .args_json(json!({
            "description": "Test Bounty",
            "host": "user1.near",
            "reward_wei": 1000
        }))
        .transact()
        .await?;

    let outcome = user_account
        .call(contract.id(), "claim_bounty")
        .args_json(json!({ "bounty_id": 0 }))
        .transact()
        .await?;
    assert!(outcome.is_success());
    Ok(())
}

/// This test checks if the process of creating a team works properly.
/// It attempts to create a team and verifies whether the creation was successful.
#[tokio::test]
async fn test_create_team() -> Result<(), Box<dyn std::error::Error>> {
    let sandbox = sandbox().await?;
    let contract_wasm = near_workspaces::compile_project("./").await?;

    let contract = sandbox.dev_deploy(&contract_wasm).await?;
    let user_account = sandbox.dev_create_account().await?;

    let outcome = user_account
        .call(contract.id(), "create_team")
        .args_json(json!({ "members": ["user1.near", "user2.near"] }))
        .transact()
        .await?;
    assert!(outcome.is_success());
    Ok(())
}

/// This test verifies if assigning a team to a bounty functions as expected.
/// It first creates a bounty and a team, and then assigns the team to the bounty.
#[tokio::test]
async fn test_assign_team_to_bounty() -> Result<(), Box<dyn std::error::Error>> {
    let sandbox = sandbox().await?;
    let contract_wasm = near_workspaces::compile_project("./").await?;

    let contract = sandbox.dev_deploy(&contract_wasm).await?;
    let user_account = sandbox.dev_create_account().await?;

    let _ = user_account
        .call(contract.id(), "create_bounty")
        .args_json(json!({
            "description": "Test Bounty",
            "host": "user1.near",
            "reward_wei": 1000
        }))
        .transact()
        .await?;

    let _ = user_account
        .call(contract.id(), "create_team")
        .args_json(json!({ "members": ["user1.near", "user2.near"] }))
        .transact()
        .await?;

    let outcome = user_account
        .call(contract.id(), "assign_team_to_bounty")
        .args_json(json!({ "bounty_id": 0, "team_id": 0 }))
        .transact()
        .await?;
    assert!(outcome.is_success());
    Ok(())
}

/// This test verifies if the process of choosing a winning team for a bounty works as intended.
/// It first creates a bounty and multiple teams, assigns a team to the bounty, and finally lets the issuer choose the winning team.
#[tokio::test]
async fn test_choose_winning_team() -> Result<(), Box<dyn std::error::Error>> {
    let sandbox = sandbox().await?;
    let contract_wasm = near_workspaces::compile_project("./").await?;

    let contract = sandbox.dev_deploy(&contract_wasm).await?;
    let user_account = sandbox.dev_create_account().await?;

    // Create a bounty
    let _ = user_account
        .call(contract.id(), "create_bounty")
        .args_json(json!({
            "description": "Test Bounty",
            "host": "user1.near",
            "reward_wei": 1000
        }))
        .transact()
        .await?;

    // Create a team
    let _ = user_account
        .call(contract.id(), "create_team")
        .args_json(json!({ "members": ["user1.near", "user2.near"] }))
        .transact()
        .await?;

    // Assign the team to the bounty
    let _ = user_account
        .call(contract.id(), "assign_team_to_bounty")
        .args_json(json!({ "bounty_id": 0, "team_id": 0 }))
        .transact()
        .await?;

    // Choose the winning team
    let outcome = user_account
        .call(contract.id(), "choose_winning_team")
        .args_json(json!({ "bounty_id": 0, "team_id": 0 }))
        .transact()
        .await?;
    assert!(outcome.is_success());
    Ok(())
}
