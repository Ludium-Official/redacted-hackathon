import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { GithubUserInfo, EvaluationResult, TeamAnalysis, RepoContent, OpenAIResponse } from './interfaces/github.interface';

@Injectable()
export class GithubService {
    private readonly openai: OpenAI;
    private readonly GITHUB_API_BASE = 'https://api.github.com';
    private readonly MIN_SKILL_COUNT = 3;
    private readonly README_TOKEN_LIMIT = 6000;

    constructor(private readonly configService: ConfigService) {
        this.openai = new OpenAI({
            apiKey: this.configService.get<string>('OPENAI_API_KEY'),
        });
    }

    /**
     * Fetches and analyzes GitHub user information including skills, followers and roles
     */
    async getUserGithubInfo(username: string): Promise<GithubUserInfo> {
        const headers = this.getGithubHeaders();

        try {
            const [userResponse, reposResponse] = await Promise.all([
                axios.get(`${this.GITHUB_API_BASE}/users/${username}`, { headers }),
                axios.get(`${this.GITHUB_API_BASE}/users/${username}/repos`, { headers })
            ]);

            const followers = userResponse.data.followers;
            const reposData = reposResponse.data;

            const skillCounts = this.analyzeRepos(reposData);
            const topSkills = this.getTopSkills(skillCounts);
            const roles = await this.analyzeRolesWithLLM(reposData);

            return { topSkills, followers, roles };
        } catch (error) {
            throw new HttpException('Failed to fetch GitHub data', HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Analyzes repositories and determines top programming languages
     */
    private analyzeRepos(reposData: any[]): Record<string, number> {
        const skillCounts: Record<string, number> = {};
        reposData.forEach(repo => {
            if (repo.language) {
                skillCounts[repo.language] = (skillCounts[repo.language] || 0) + 1;
            }
        });
        return skillCounts;
    }

    /**
     * Gets top skills based on repository language frequency
     */
    private getTopSkills(skillCounts: Record<string, number>): string[] {
        const filteredSkills = Object.entries(skillCounts)
            .filter(([_, count]) => count >= this.MIN_SKILL_COUNT)
            .sort((a, b) => b[1] - a[1]);

        if (filteredSkills.length === 0) {
            return Object.entries(skillCounts)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 1)
                .map(([language]) => language);
        }

        return filteredSkills.slice(0, 3).map(([language]) => language);
    }

    /**
     * Analyzes GitHub repositories to determine user roles using LLM
     */
    private async analyzeRolesWithLLM(reposData: any[]): Promise<string[]> {
        const repoDetails = reposData.map(repo => ({
            description: repo.description || '',
            language: repo.language || ''
        }));

        try {
            const content = await this.performLLMAnalysis<string>(
                this.generateRoleAnalysisPrompt(repoDetails),
                'role-analysis'
            );
            return this.parseRoleAnalysisResponse(content);
        } catch (error) {
            console.error('Role analysis error:', error);
            return [];
        }
    }

    /**
     * Analyzes hackathon team repositories and provides rankings
     */
    async analyzeTeams(data: {
        teams: Array<{ repo: string }>;
        evalCriteria: Array<{ name: string; weight: number }>;
        purpose: string;
    }): Promise<{ rankings: EvaluationResult[] }> {
        try {
            const teamAnalyses = await Promise.all(
                data.teams.map(team => this.analyzeRepository(team.repo, data.purpose))
            );
            console.log("teamAnalyses", JSON.stringify(teamAnalyses));

            const evaluations = await this.evaluateAllTeams(
                teamAnalyses,
                data.evalCriteria,
                data.purpose
            );

            console.log("evaluations", JSON.stringify(evaluations));

            return { rankings: this.calculateRankings(evaluations) };
        } catch (error) {
            throw new HttpException('Team analysis failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Matches teams based on user roles
     */
    async matchTeams(userRoles: Array<{ userId: string, roles: string[] }>): Promise<any> {
        try {
            const content = await this.performLLMAnalysis<string>(
                this.generateTeamMatchingPrompt(userRoles),
                'team-matching'
            );
            return JSON.parse(content);
        } catch (error) {
            console.error('Team matching error:', error);
            return { teams: [] };
        }
    }

    /**
     * Fetches and analyzes individual repository content
     */
    private async analyzeRepository(repoUrl: string, purpose: string): Promise<TeamAnalysis> {
        try {
            console.log("repoUrl", repoUrl)
            console.log("purpose", purpose)
            const repoContent = await this.fetchRepoContent(repoUrl);
            console.log("repoContent", repoContent)
            const analysisPrompt = this.generateRepoAnalysisPrompt(repoContent, purpose);
            console.log("analysisPrompt", analysisPrompt)
            return await this.performLLMAnalysis(analysisPrompt, 'repo-analysis');
        } catch (error) {
            throw error;
        }
    }

    /**
     * Fetches repository content using GitHub API
     */
    private async fetchRepoContent(repoUrl: string): Promise<RepoContent> {
        const [owner, repo] = this.parseGithubUrl(repoUrl);
        const headers = this.getGithubHeaders();

        try {
            const [repoData, readmeData, languagesData] = await Promise.all([
                axios.get(`${this.GITHUB_API_BASE}/repos/${owner}/${repo}`, { headers }),
                axios.get(`${this.GITHUB_API_BASE}/repos/${owner}/${repo}/readme`, { headers })
                    .then(res => Buffer.from(res.data.content, 'base64').toString('utf8'))
                    .catch(() => ''),
                axios.get(`${this.GITHUB_API_BASE}/repos/${owner}/${repo}/languages`, { headers })
            ]);
            console.log("dbg fetchRepoContent");

            return {
                readme: readmeData,
                description: repoData.data.description || '',
                languages: languagesData.data,
                commitCount: repoData.data.commits_count,
                contributors: repoData.data.contributors_count,
                lastUpdate: repoData.data.updated_at
            };
        } catch (error) {
            throw error;
        }
    }

    // Helper methods
    private getGithubHeaders(): { Authorization: string } {
        return {
            Authorization: `token ${this.configService.get<string>('GITHUB_TOKEN')}`
        };
    }

    private parseGithubUrl(url: string): [string, string] {
        const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
        if (!match) throw new Error('Invalid GitHub URL');
        return [match[1], match[2]];
    }

    private async performLLMAnalysis<T extends TeamAnalysis | string>(
        prompt: string,
        type: string
    ): Promise<T> {
        try {
            const response = await this.openai.chat.completions.create({
                model: 'gpt-4',
                messages: [
                    {
                        role: 'system',
                        content: this.getLLMSystemPrompt(type)
                    },
                    { role: 'user', content: prompt }
                ],
                temperature: 0.1,
            }) as OpenAIResponse;

            const content = response.choices[0].message.content.trim();
            console.log("performLLMAnalysis content", content)
            // type에 따라 다른 처리
            if (type === 'repo-analysis') {
                return JSON.parse(content) as T;
            }
            return content as T;
        } catch (error) {
            console.error('LLM Analysis error:', error);
            throw error;
        }
    }

    private getLLMSystemPrompt(type: string): string {
        const prompts = {
            'role-analysis': 'You are a JSON-only response bot. Output valid JSON objects in the exact format specified.',
            'repo-analysis': 'You are an expert code reviewer and project evaluator.',
            'team-matching': 'You are a team formation specialist.'
        };
        return prompts[type] || 'You are an AI assistant.';
    }

    private parseRoleAnalysisResponse(content: string): string[] {
        try {
            const analysis = JSON.parse(content);
            return analysis.finalRoles;
        } catch (error) {
            const matches = content.match(/"finalRoles"\s*:\s*(\[.*?\])/s);
            if (matches?.[1]) {
                try {
                    return JSON.parse(matches[1]);
                } catch {
                    return [];
                }
            }
            return [];
        }
    }

    private calculateRankings(evaluations: EvaluationResult[]): EvaluationResult[] {
        return evaluations
            .sort((a, b) => b.totalScore - a.totalScore)
            .map((evaluation, index) => ({
                ...evaluation,
                rank: index + 1
            }));
    }

    // 1. Role Analysis Prompt Generation
    private generateRoleAnalysisPrompt(repoDetails: Array<{ description: string; language: string }>): string {
        return `You must respond ONLY with a JSON object in the exact format shown below. Do not include any additional text, explanations, or analysis outside of the JSON structure.

    Required JSON Format:
    {
        "analysis": {
            "Front": {"count": number, "repos": []},
            "Back": {"count": number, "repos": []},
            "Blockchain": {"count": number, "repos": []}
        },
        "finalRoles": []
    }
    
    Analyze these repositories and fill the JSON structure according to these rules:
    ${JSON.stringify(repoDetails, null, 2)}
    
    Classification Rules:
    - Front: JavaScript/TypeScript + UI/React/Vue
    - Back: Python/Java/Go + API/Server/Database
    - Blockchain: Solidity/Rust + Smart Contract/Web3
    
    Role Determination Rules:
    - If total repos = 0: empty finalRoles array
    - If total repos 1-5: include only highest count role
    - If total repos > 5: include roles with count >= 3
    
    IMPORTANT: Respond ONLY with the JSON object. No other text.`;
    }

    // 2. Team Matching Prompt Generation
    private generateTeamMatchingPrompt(userRoles: Array<{ userId: string, roles: string[] }>): string {
        return `
    Return ONLY a valid JSON object representing team formations.
    Format each team with team number and members with their primary roles.
    
    Input developers:
    ${JSON.stringify(userRoles, null, 2)}
    
    Requirements:
    1. Each team needs Front, Back, and Blockchain roles
    2. Distribute developers evenly
    3. Multi-role developers can fulfill any of their roles
    
    Response must be a valid JSON object in this exact format:
    {
      "teams": [
        {
          "team1": [
            {"userId": "user1", "role": "role1"},
            {"userId": "user2", "role": "role2"}
          ]
        }
      ]
    }`;
    }

    // 3. Repository Analysis Prompt Generation
    private generateRepoAnalysisPrompt(content: RepoContent, purpose: string): string {
        return `
    Analyze this GitHub repository for a hackathon project:
    
    Project Purpose: ${purpose}
    
    Repository Information:
    - Description: ${content.description}
    - Languages Used: ${JSON.stringify(content.languages)}
    - Commit Count: ${content.commitCount}
    - Contributors: ${content.contributors}
    - Last Update: ${content.lastUpdate}
    
    README Content:
    ${content.readme.substring(0, this.README_TOKEN_LIMIT)}
    
    Analyze and provide:
    1. Code Completeness (0-10)
    2. Purpose Alignment (0-10)
    3. Documentation Quality (0-10)
    4. Detailed Analysis (max 200 words)

    Although you may not be able to accurately evaluate the repo, please provide an analysis based solely on the given information. Do not respond with any additional comments; answer strictly in JSON format only.
    
    Return response in JSON format:
    {
     "completeness": number,
     "purposeAlignment": number,
     "documentation": number,
     "details": string
    }`;
    }

    // 4. Team Evaluation Method
    private async evaluateAllTeams(
        analyses: TeamAnalysis[],
        criteria: Array<{ name: string; weight: number }>,
        purpose: string
    ): Promise<EvaluationResult[]> {
        const evaluationPrompt = `
        Evaluate ${analyses.length} hackathon teams based on their repository analyses.
        
        Hackathon Purpose: ${purpose}
        
        Evaluation Criteria and Weights:
        ${JSON.stringify(criteria, null, 2)}
        
        Team Analyses:
        ${JSON.stringify(analyses, null, 2)}
        
        For each team, provide:
        1. Total score (0-100)
        2. Score for each criterion (0-10)
        3. Detailed rationale for scores
        
        Do not respond with any additional comments; answer strictly in JSON format only. Return array of evaluations in JSON format:
        [{
         "teamId": string,
         "totalScore": number,
         "criteriaScores": Record<string, number>,
         "rationale": string
        }]`;

        try {
            const content = await this.performLLMAnalysis<string>(evaluationPrompt, 'team-evaluation');
            console.log("performLLMAnalysis")
            return JSON.parse(content);
        } catch (error) {
            console.error('Team evaluation error:', error);
            return [];
        }
    }
}