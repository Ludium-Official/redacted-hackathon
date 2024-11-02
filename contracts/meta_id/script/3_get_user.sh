near call $NEAR_ID get_user_wrapper "$(jq -n \
  --arg account "test-user.testnet" \
  '{account_id: $account}')" \
  --use-account $NEAR_ID 

