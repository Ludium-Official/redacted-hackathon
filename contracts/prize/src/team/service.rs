use near_sdk::{log, store::TreeMap, AccountId};

use crate::{bounty::model::Bounty, Balance};

use super::model::{Team, TeamId};

// Team 관련 함수들 구현
pub fn _create_team(
    teams: &mut TreeMap<TeamId, Team>,
    next_team_id: &mut TeamId,
    members: Vec<AccountId>,
) -> TeamId {
    let team = Team {
        team_id: *next_team_id,
        members,
    };
    let team_id = *next_team_id;
    teams.insert(team_id, team.clone());
    *next_team_id += 1;

    team_id
}

pub fn _get_team(teams: &TreeMap<TeamId, Team>, team_id: TeamId) -> Option<&Team> {
    teams.get(&team_id)
}

pub fn _update_team(
    teams: &mut TreeMap<TeamId, Team>,
    team_id: TeamId,
    members: Option<Vec<AccountId>>,
) {
    let team = match teams.get(&team_id) {
        Some(team) => team,
        None => {
            log!("Team {} not found.", team_id);
            return;
        }
    };

    let mut tmp = team.clone();

    if let Some(new_members) = members {
        tmp.members = new_members;
    }
    teams.insert(team_id, tmp.clone());
    log!("Team {} updated successfully.", team_id);
}

pub fn _delete_team(teams: &mut TreeMap<TeamId, Team>, team_id: TeamId) {
    if teams.remove(&team_id).is_some() {
        log!("Team {} deleted successfully.", team_id);
    } else {
        log!("Team {} not found.", team_id);
    }
}

pub fn _get_team_prize_amount(prizes: &TreeMap<u64, Bounty>, bounty_id: u64) -> Option<Balance> {
    match prizes.get(&bounty_id) {
        Some(bounty) => Some(bounty.reward_wei),
        None => {
            log!("Bounty {} not found.", bounty_id);
            None
        }
    }
}
