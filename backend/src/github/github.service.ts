import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { GithubUserInfo } from './interfaces/github-user.interface';
import * as cheerio from 'cheerio';

@Injectable()
export class GithubService {
    private readonly openai: OpenAI;

    constructor(private readonly configService: ConfigService) {
        this.openai = new OpenAI({
            apiKey: this.configService.get<string>('OPENAI_API_KEY'),
        });
    }

    async getUserGithubInfo(username: string): Promise<GithubUserInfo> {
        const githubToken = this.configService.get<string>('GITHUB_TOKEN');
        const headers = { Authorization: `token ${githubToken}` };

        try {
            const userResponse = await axios.get(
                `https://api.github.com/users/${username}`,
                { headers },
            );
            const followers = userResponse.data.followers;

            const reposResponse = await axios.get(
                `https://api.github.com/users/${username}/repos`,
                { headers },
            );
            const reposData = reposResponse.data;

            const skillCounts = this.analyzeRepos(reposData);
            const filteredSkills = Object.entries(skillCounts)
                .filter(([_, count]) => count >= 3)
                .sort((a, b) => b[1] - a[1]);

            let topSkills: string[];
            if (filteredSkills.length === 0) {
                topSkills = Object.entries(skillCounts)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 1)
                    .map(([language]) => language);
            } else {
                topSkills = filteredSkills
                    .slice(0, 3)
                    .map(([language]) => language);
            }
            console.log("skillCounts", skillCounts)

            const roles = await this.analyzeRolesWithLLM(reposData);

            return {
                topSkills,
                followers,
                roles,
            };

        } catch (error) {
            throw new HttpException(
                'Failed to fetch GitHub data',
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    private async analyzeRolesWithLLM(reposData: any[]): Promise<string[]> {
        const repoDetails = reposData.map(repo => ({
            description: repo.description || '',
            language: repo.language || ''
        }));

        const prompt = `You must respond ONLY with a JSON object in the exact format shown below. Do not include any additional text, explanations, or analysis outside of the JSON structure.
    
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

        try {
            const response = await this.openai.chat.completions.create({
                model: 'gpt-4',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a JSON-only response bot. Only output valid JSON objects in the exact format specified. No other text.'
                    },
                    { role: 'user', content: prompt }
                ],
                temperature: 0.1,
            });

            const content = response.choices[0].message.content.trim();

            try {
                const analysis = JSON.parse(content);
                return analysis.finalRoles;
            } catch (error) {
                console.error('Error parsing JSON response:', error);
                console.log('Raw response:', content);

                // JSON 파싱 실패 시 정규식으로 finalRoles 배열 추출 시도
                const matches = content.match(/"finalRoles"\s*:\s*(\[.*?\])/s);
                if (matches && matches[1]) {
                    try {
                        return JSON.parse(matches[1]);
                    } catch {
                        return [];
                    }
                }
                return [];
            }
        } catch (error) {
            console.error('Error in LLM analysis:', error);
            return [];
        }
    }

    private extractRolesManually(content: string): string[] {
        try {
            const finalRolesMatch = content.match(/"finalRoles"\s*:\s*(\[.*?\])/);
            if (finalRolesMatch && finalRolesMatch[1]) {
                return JSON.parse(finalRolesMatch[1]);
            }

            const counts = {
                Front: 0,
                Back: 0,
                Blockchain: 0
            };

            Object.keys(counts).forEach(role => {
                const countMatch = content.match(new RegExp(`"${role}"\\s*:\\s*{\\s*"count"\\s*:\\s*(\\d+)`));
                if (countMatch) {
                    counts[role] = parseInt(countMatch[1]);
                }
            });

            const totalRepos = Object.values(counts).reduce((a, b) => a + b, 0);
            if (totalRepos <= 0) return [];
            if (totalRepos <= 5) {
                const maxRole = Object.entries(counts)
                    .reduce((a, b) => a[1] > b[1] ? a : b)[0];
                return [maxRole];
            }
            return Object.entries(counts)
                .filter(([_, count]) => count >= 3)
                .map(([role]) => role);

        } catch (error) {
            console.error('Error in manual role extraction:', error);
            return [];
        }
    }

    async matchTeams(userRoles: Array<{ userId: string, roles: string[] }>): Promise<string> {
        const prompt = `
As a team formation expert, create balanced teams from the following developers.
Each team should have at least one member with each role (Front, Back, Blockchain).

Developers and their roles:
${JSON.stringify(userRoles, null, 2)}

Requirements:
1. Each team must have at least one Frontend, Backend, and Blockchain developer
2. Try to distribute developers evenly across teams
3. Some developers may have multiple roles and can fulfill multiple requirements

Return the teams in the following format:
[team1: [user1: role1, user2: role2, user3: role3], team2: [user4: role1, user5: role2, ...], ...]

Only return the team formations, no additional explanations.
`;

        const response = await this.openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                { role: 'system', content: 'You are a team formation expert.' },
                { role: 'user', content: prompt }
            ],
            temperature: 0.3,
        });

        return response.choices[0].message.content.trim();
    }

    private analyzeRepos(reposData: any[]): Record<string, number> {
        const skillCounts: Record<string, number> = {};

        reposData.forEach(repo => {
            const language = repo.language;
            if (language) {
                skillCounts[language] = (skillCounts[language] || 0) + 1;
            }
        });

        return skillCounts;
    }

    async generatePrompt(username: string, skillCounts: Record<string, number>) {
        const skills = Object.entries(skillCounts)
            .map(([language, count]) => `${language} (${count})`)
            .join(', ');

        return `GitHub user ${username} has demonstrated experience in the following skills and languages:
      ${skills}.
      
      Based on this information, please provide a detailed assessment of the user's skill levels for each technology, 
      focusing on their proficiency and typical usage frequency on a scale from 1 to 10, where 1 is novice and 10 is expert.
      
      Additionally, provide insights into whether their skillset suggests they are stronger in frontend, backend, 
      or full-stack development.`;
    }

    async evaluateSkillsWithGPT(prompt: string): Promise<string> {
        const response = await this.openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                { role: 'system', content: 'You are an expert software engineering assistant.' },
                { role: 'user', content: prompt },
            ],
            max_tokens: 150,
            temperature: 0.7,
        });
        return response.choices[0].message.content.trim() ?? '';
    }
}