near call $NEAR_ID get_role_wrapper "$(jq -n \
  --arg account "admin" \
  '{role_name: $account}')" \
  --use-account $NEAR_ID 
