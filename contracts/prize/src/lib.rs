use bounty::{
    model::Bounty,
    service::{
        _assign_team_to_bounty, _claim_bounty, _create_bounty, _delete_bounty, _get_bounty,
        _update_bounty,
    },
};
use near_sdk::{env, log, near, store::TreeMap, AccountId};
use team::{
    model::{Team, TeamId},
    service::{_create_team, _delete_team, _get_team, _get_team_prize_amount, _update_team},
};

mod bounty;
mod team;
mod utils;

pub type Balance = u64;

#[near(contract_state)]
pub struct Contract {
    pub prizes: TreeMap<u64, Bounty>,
    pub teams: TreeMap<TeamId, Team>,
    pub next_prize_id: u64,
    pub next_team_id: TeamId,
}

impl Default for Contract {
    fn default() -> Self {
        Self {
            prizes: TreeMap::new(b"p"),
            teams: TreeMap::new(b"t"),
            next_prize_id: 0u64,
            next_team_id: 0u64,
        }
    }
}

#[near]
impl Contract {
    /// Bounty 생성 메소드
    pub fn create_bounty(
        &mut self,
        description: String,
        host: AccountId,
        reward_wei: Balance,
    ) -> u64 {
        _create_bounty(
            &mut self.prizes,
            &mut self.next_prize_id,
            description,
            host,
            reward_wei,
        )
    }

    /// 특정 Bounty 조회 메소드
    pub fn get_bounty(&self, bounty_id: u64) -> Option<&Bounty> {
        _get_bounty(&self.prizes, bounty_id)
    }

    /// Bounty 업데이트 메소드
    pub fn update_bounty(
        &mut self,
        bounty_id: u64,
        description: Option<String>,
        reward_wei: Option<Balance>,
        join_teams: Option<Vec<TeamId>>,
    ) {
        _update_bounty(
            &mut self.prizes,
            bounty_id,
            description,
            reward_wei,
            join_teams,
        );
    }

    /// Bounty 삭제 메소드
    pub fn delete_bounty(&mut self, bounty_id: u64) {
        _delete_bounty(&mut self.prizes, bounty_id);
    }

    /// Bounty 할당 메소드 (팀 할당)
    pub fn assign_team_to_bounty(&mut self, bounty_id: u64, team_id: TeamId) {
        _assign_team_to_bounty(&mut self.prizes, bounty_id, team_id);
    }

    /// Bounty 상금 지급 메소드
    pub fn claim_bounty(&mut self, bounty_id: u64, requester: AccountId) {
        _claim_bounty(&mut self.prizes, bounty_id, requester);
    }

    /// Team 생성 메소드
    pub fn create_team(&mut self, members: Vec<AccountId>) -> TeamId {
        _create_team(&mut self.teams, &mut self.next_team_id, members)
    }

    /// 특정 Team 조회 메소드
    pub fn get_team(&self, team_id: TeamId) -> Option<&Team> {
        _get_team(&self.teams, team_id)
    }

    /// Team 업데이트 메소드
    pub fn update_team(&mut self, team_id: TeamId, members: Option<Vec<AccountId>>) {
        _update_team(&mut self.teams, team_id, members);
    }

    /// Team 삭제 메소드
    pub fn delete_team(&mut self, team_id: TeamId) {
        _delete_team(&mut self.teams, team_id);
    }

    /// Team이 속한 Bounty의 상금 조회 메소드
    pub fn get_team_prize_amount(&self, bounty_id: u64) -> Option<Balance> {
        _get_team_prize_amount(&self.prizes, bounty_id)
    }

    /// Winning Team 선택
    pub fn choose_winning_team(&mut self, bounty_id: u64, team_id: u64) {
        let bounty = match self.prizes.get(&bounty_id) {
            Some(bounty) => bounty,
            None => {
                log!("Bounty {} not found.", bounty_id);
                return;
            }
        };

        let mut tmp = bounty.clone();

        assert!(
            bounty.host == env::predecessor_account_id(),
            "Only the issuer can choose a winning team."
        );
        assert!(!bounty.is_claimed, "Bounty is already claimed.");

        if let Some(joined_teams) = &bounty.join_teams {
            if joined_teams.contains(&team_id) {
                tmp.is_claimed = true;
                log!(
                    "Team {} has been chosen as the winner for Bounty {}.",
                    team_id,
                    bounty_id
                );
                self.prizes.insert(bounty_id, tmp.clone());
            } else {
                log!("Team {} is not part of this Bounty.", team_id);
            }
        } else {
            log!("No teams have joined this Bounty.");
        }
    }
}
