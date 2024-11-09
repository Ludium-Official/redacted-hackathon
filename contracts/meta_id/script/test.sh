#
#
#
cargo near build --no-docker
near deploy $META_ID ./target/near/meta_id.wasm
#
#
#
near call $META_ID add_user "$(jq -n \
  --arg account "aaron.testnet" \
  --arg email "test-user@test-user.com" \
  --arg name "test user" \
  --arg provider "provider who" \
  '{account: $account, email: $email, name: $name, provider: $provider}')" \
  --use-account $META_ID 
#
#
#
near call $META_ID get_user "$(jq -n \
  --arg account "aaron.testnet" \
  '{account_id: $account}')" \
  --use-account $META_ID 
#
#
# New one (add_career)
near call $META_ID add_career "$(jq -n \
  --arg account_id "aaron.testnet" \
  --argjson career_data '{
    "top_skills": ["Python", "C++", "TypeScript"],
    "followers": 1500,
    "roles": ["Backend", "Frontend"],
    "contributions": 5000
  }' \
  '{account_id: $account_id, career_data: $career_data}')" \
  --use-account $META_ID
