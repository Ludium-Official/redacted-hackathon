// src/github/github.controller.ts
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GithubService } from './github.service';

@Controller('github')
export class GithubController {
    constructor(private readonly githubService: GithubService) { }

    @Get('skills/:username')
    async getUserGithubInfo(@Param('username') username: string) {
        console.log("username: {}", username);
        const careerData = await this.githubService.getUserGithubInfo(username);
        return { careerData };
    }

    @Post('match-teams')
    async matchTeams(@Body() body: { users: Array<{ userId: string, roles: string[] }> }) {
        console.log("matchTeams: ", body);
        const result = await this.githubService.matchTeams(body.users);
        return { result };
    }
}