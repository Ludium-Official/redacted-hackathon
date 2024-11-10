export interface GithubUserInfo {
    topSkills: string[];
    followers: number;
    roles: string[];
}

export interface TeamAnalysis {
    repoUrl: string;
    codeAnalysis: {
        completeness: number;
        purposeAlignment: number;
        documentation: number;
    };
    details: string;
}

export interface EvaluationResult {
    teamId: string;
    rank: number;
    totalScore: number;
    criteriaScores: Record<string, number>;
    rationale: string;
}

export interface RepoContent {
    readme: string;
    description: string;
    languages: Record<string, number>;
    commitCount: number;
    contributors: number;
    lastUpdate: string;
}

export interface OpenAIResponse {
    choices: Array<{
        message: {
            content: string;
        };
    }>;
}