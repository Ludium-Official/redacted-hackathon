use near_sdk::{env, log, store::TreeMap, AccountId, NearToken, Promise};

use crate::{team::model::TeamId, Balance};

use super::model::Bounty;

pub fn _create_bounty(
    prizes: &mut TreeMap<u64, Bounty>,
    next_prize_id: &mut u64,
    description: String,
    host: AccountId,
    reward_wei: Balance,
) -> u64 {
    let current_timestamp = env::block_timestamp();

    let bounty = Bounty {
        description,
        host: host.clone(),
        reward_wei,
        join_teams: None,
        is_claimed: false,
        total_amount: reward_wei,
        created_at: current_timestamp,
        updated_at: current_timestamp,
    };
    let bounty_id = *next_prize_id;
    prizes.insert(bounty_id, bounty.clone());
    *next_prize_id += 1;

    bounty_id
}

pub fn _get_bounty(prizes: &TreeMap<u64, Bounty>, bounty_id: u64) -> Option<&Bounty> {
    prizes.get(&bounty_id)
}

pub fn _update_bounty(
    prizes: &mut TreeMap<u64, Bounty>,
    bounty_id: u64,
    description: Option<String>,
    reward_wei: Option<Balance>,
    join_teams: Option<Vec<TeamId>>,
) {
    let bounty = match prizes.get(&bounty_id) {
        Some(bounty) => bounty,
        None => {
            log!("Bounty {} not found.", bounty_id);
            return;
        }
    };

    let mut tmp = bounty.clone();

    if let Some(desc) = description {
        tmp.description = desc;
    }
    if let Some(reward) = reward_wei {
        assert!(
            reward <= tmp.total_amount,
            "Not enough prize funds available."
        );
        tmp.total_amount -= bounty.reward_wei;
        tmp.total_amount += reward;
        tmp.reward_wei = reward;
    }
    if let Some(teams) = join_teams {
        tmp.join_teams = Some(teams);
    }

    tmp.updated_at = env::block_timestamp();
    prizes.insert(bounty_id, tmp);
    log!("Bounty {} updated successfully.", bounty_id);
}

pub fn _delete_bounty(prizes: &mut TreeMap<u64, Bounty>, bounty_id: u64) {
    if prizes.remove(&bounty_id).is_some() {
        log!("Bounty {} deleted successfully.", bounty_id);
    } else {
        log!("Bounty {} not found.", bounty_id);
    }
}

pub fn _assign_team_to_bounty(prizes: &mut TreeMap<u64, Bounty>, bounty_id: u64, team_id: TeamId) {
    let bounty = match prizes.get(&bounty_id) {
        Some(bounty) => bounty,
        None => {
            log!("Bounty {} not found.", bounty_id);
            return;
        }
    };

    let mut tmp = bounty.clone();

    if let Some(ref mut teams) = tmp.join_teams {
        if !teams.contains(&team_id) {
            teams.push(team_id);
        }
    } else {
        tmp.join_teams = Some(vec![team_id]);
    }

    // tmp.updated_at = env::block_timestamp();
    prizes.insert(bounty_id, tmp);

    log!(
        "Team {} assigned to Bounty {} successfully.",
        team_id,
        bounty_id
    );
}

pub fn _claim_bounty(
    //
    prizes: &mut TreeMap<u64, Bounty>,
    bounty_id: u64,
    requester: AccountId,
) {
    let bounty = match prizes.get(&bounty_id) {
        Some(bounty) => bounty,
        None => {
            log!("Bounty {} not found.", bounty_id);
            return;
        }
    };
    assert!(!bounty.is_claimed, "Bounty is already claimed.");
    assert!(
        bounty.host == requester,
        "Only the host can claim the bounty."
    );

    let mut tmp = bounty.clone();

    tmp.is_claimed = true;

    prizes.insert(bounty_id, tmp.clone());

    // 실제로 상금을 지급하는 로직 추가
    Promise::new(requester.clone()) //
        .transfer(NearToken::from_yoctonear(tmp.reward_wei.into()));
    log!(
        "Bounty {} claimed by {} successfully.",
        bounty_id,
        requester
    );
}
