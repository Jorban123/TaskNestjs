import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getAll(): Promise<User[] | HttpException> {
    return this.userService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') userId: number): Promise<User | HttpException> {
    return this.userService.getOne(userId);
  }

  @Post()
  async create(@Body() user: CreateUserDto): Promise<User | HttpException> {
    return this.userService.userCreate(user);
  }

  @Put(':id')
  async update(@Param('id') userId: number, @Body() updatedUser: UpdateUserDto): Promise<User | HttpException> {
    return this.userService.userUpdate(userId, updatedUser);
  }

  @Delete(':id')
  async remove(@Param('id') userId: number): Promise<string | HttpException> {
    return this.userService.userDelete(userId);
  }
}
