near call $NEAR_ID add_role_to_user "$(jq -n \
  --arg user_id "test-user.testnet" \
  --arg role_name "admin" \
  '{user_id: $user_id, role_name: $role_name}')" \
  --use-account $NEAR_ID 
