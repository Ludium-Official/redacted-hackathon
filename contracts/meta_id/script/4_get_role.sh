near call $NEAR_ID get_role "$(jq -n \
  --arg account "admin" \
  '{role_name: $account}')" \
  --use-account $NEAR_ID 
