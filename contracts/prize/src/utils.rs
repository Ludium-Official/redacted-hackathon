use near_sdk::{
    log,
    store::{LookupMap, TreeMap},
};

use crate::{bounty::model::Bounty, team::model::TeamId, Balance};

pub fn _get_team_prize_amount(prizes: &LookupMap<u64, Bounty>, bounty_id: u64) -> Option<Balance> {
    match prizes.get(&bounty_id) {
        Some(bounty) => Some(bounty.reward_wei),
        None => {
            log!("Bounty {} not found.", bounty_id);
            None
        }
    }
}

pub fn _get_bounty_for_team(prizes: &TreeMap<u64, Bounty>, team_id: TeamId) -> Vec<Bounty> {
    // 변경됨: LookupMap -> TreeMap
    prizes
        .iter()
        .filter_map(|(_, bounty)| {
            if let Some(join_teams) = &bounty.join_teams {
                if join_teams.contains(&team_id) {
                    return Some(bounty.clone());
                }
            }
            None
        })
        .collect()
}

// 새로 추가된 Getter 함수들 구현
pub fn _get_all_open_bounties(prizes: &TreeMap<u64, Bounty>) -> Vec<Bounty> {
    // 변경됨: LookupMap -> TreeMap
    prizes
        .iter()
        .filter_map(|(_, bounty)| {
            if !bounty.is_claimed {
                Some(bounty.clone())
            } else {
                None
            }
        })
        .collect()
}

pub fn _get_all_team_participation(prizes: &TreeMap<u64, Bounty>, team_id: TeamId) -> Vec<Bounty> {
    // 변경됨: LookupMap -> TreeMap
    _get_bounty_for_team(prizes, team_id)
}

pub fn _get_all_closed_bounties(prizes: &TreeMap<u64, Bounty>) -> Vec<Bounty> {
    // 변경됨: LookupMap -> TreeMap
    prizes
        .iter()
        .filter_map(|(_, bounty)| {
            if bounty.is_claimed {
                Some(bounty.clone())
            } else {
                None
            }
        })
        .collect()
}
