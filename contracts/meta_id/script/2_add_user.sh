near call $NEAR_ID add_user_wrapper "$(jq -n \
  --arg account "test-user.testnet" \
  --arg email "test-user@test-user.com" \
  --arg name "test user" \
  --arg provider "provider who" \
  '{account: $account, email: $email, name: $name, provider: $provider}')" \
  --use-account $NEAR_ID 

