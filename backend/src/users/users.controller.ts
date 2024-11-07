// src/users/users.controller.ts

import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<User> {
        return this.usersService.findOne(+id);
    }

    @Post()
    create(@Body() body: { name: string; email: string }): Promise<User> {
        return this.usersService.createUser(body.name, body.email);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.usersService.remove(+id);
    }
}