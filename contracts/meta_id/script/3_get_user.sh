near call $NEAR_ID get_user "$(jq -n \
  --arg account "test-user.testnet" \
  '{account_id: $account}')" \
  --use-account $NEAR_ID 


# New one (add_skills)
near call $NEAR_ID add_skill "$(jq -n \
  --arg account_id "test-user.testnet" \
  --argjson skills '["Python", "C++", "TypeScript"]' \
  '{account_id: $account_id, skills: $skills}')" \
  --use-account $NEAR_ID

