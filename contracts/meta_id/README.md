# MetaID Smart Contract

MetaID is a NEAR smart contract designed to manage users and roles. It supports adding, updating, retrieving, and removing both users and roles, and also assigning roles to users.

The contract is organized into two main modules: `user` and `role`. Each module consists of three files - `mod.rs`, `model.rs`, and `service.rs` - containing the definitions, models, and services required for CRUD operations (Create, Read, Update, Delete). The structure makes it easy to handle user and role data efficiently.

## How to Use

1. **Scripts Overview**:
    - Before executing the main scripts (1 to 5), ensure you have generated a testnet account using script 0 and set the generated account as your environment variable using `export NEAR_ID="<generated_account>"`.

    ### Scripts:
    0. **Create Testnet Account**:
        ```sh
        ./scripts/0_create_testnet_account.sh
        ```
        This script creates a new NEAR testnet account, which you will use for interacting with the smart contract.
    
    1. **Deploy Contract**:
        ```sh
        ./scripts/1_deploy_contract.sh
        ```
        Deploy the MetaID smart contract to the NEAR blockchain using the created testnet account.

    2. **Add User**:
        ```sh
        ./scripts/2_add_user.sh
        ```
        Add a new user to the MetaID contract. This includes user details like email, name, and provider.

    3. **Add Role**:
        ```sh
        ./scripts/3_add_role.sh
        ```
        Create a new role, specifying a description and any users to assign initially.

    4. **Assign Role to User**:
        ```sh
        ./scripts/4_assign_role_to_user.sh
        ```
        Assign an existing role to a specific user in the contract.

    5. **Get User Details**:
        ```sh
        ./scripts/5_get_user_details.sh
        ```
        Retrieve information about a particular user, including the roles assigned to them.

## Modules Description
- **User Module**: Contains models and services to manage users, including creating, updating, reading, and deleting user information.
  - **User Model**:
    ```rust
    #[derive(Clone)]
    #[near(serializers = [json, borsh])]
    pub struct UserInfo {
        pub account: AccountId,
        pub email: String,
        pub name: String,
        pub provider: String,
        pub roles: Vec<String>,
        pub created_at: u64,
        pub updated_at: u64,
    }
    ```
    This model represents the structure for storing user information, such as account, email, name, provider, roles, and timestamps for creation and updates.

- **Role Module**: Similar to the User module, this includes models and services to manage roles and handle role assignments.
  - **Role Model**:
    ```rust
    #[derive(Clone)]
    #[near(serializers = [json, borsh])]
    pub struct Role {
        pub name: String,
        pub description: Option<String>,
        pub assigned_users: Option<Vec<AccountId>>,
    }
    ```
    This model represents a role that can be assigned to users, including fields for the role name, description, and assigned users.


