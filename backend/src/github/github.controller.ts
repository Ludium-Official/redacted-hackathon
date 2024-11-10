// src/github/github.controller.ts
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GithubService } from './github.service';

@Controller('api/github')
export class GithubController {
    constructor(private readonly githubService: GithubService) { }

    @Get('skills/:username')
    async getUserGithubInfo(@Param('username') username: string) {
        console.log("username: ", username);
        const careerData = await this.githubService.getUserGithubInfo(username);
        return { careerData };
    }

    @Post('match-teams')
    async matchTeams(@Body() body: { users: Array<{ userId: string, roles: string[] }> }) {
        console.log("matchTeams: ", JSON.stringify(body, null, 2));

        const result = await this.githubService.matchTeams(body.users);
        console.log("result: ", JSON.stringify(result, null, 2));
        return { result };
    }

    @Post('evaluate-teams')
    async evaluateAllTeams(@Body() body: { teams: Array<{ repo: string }>, evalCriteria: Array<{ name: string; weight: number }>, purpose: string }) {
        const result = await this.githubService.analyzeTeams(body);
        console.log("result: ", JSON.stringify(result, null, 2));
        return { result };
    }

}