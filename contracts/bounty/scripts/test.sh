# generate new testnet account
cargo-near near create-dev-account \
  use-random-account-id \
  autogenerate-new-keypair \
  save-to-legacy-keychain \
  network-config testnet \
  create

# deploy
near deploy $BOUNTY ./target/near/bounty.wasm


# add_applicant
near call $BOUNTY add_applicant "$(jq -n \
  --argjson bounty_id 1 \
  --arg applicant "aaron.testnet" \
  '{bounty_id: $bounty_id, applicant: $applicant}')" \
  --use-account $BOUNTY

# get bounty
near view $BOUNTY get_bounty "$(jq -n \
  --argjson bounty_id 1 \
  '{bounty_id: $bounty_id}')"

# get all applicant
near view $BOUNTY get_all_applicants "$(jq -n \
  --argjson bounty_id 1 \
  '{bounty_id: $bounty_id}')"

# assign team to bounty
near call $BOUNTY assign_team_to_bounty "$(jq -n \
  --argjson bounty_id 1 \
  --argjson teams '[["cccc.testnet", "dddd.testnet"]]' \
  '{bounty_id: $bounty_id, teams:$teams}')" \
  --use-account $BOUNTY
