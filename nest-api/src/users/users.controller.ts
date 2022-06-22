import {
  Body,
  Controller,
  Delete,
  Get,
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
  async getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') userId: number): Promise<User> {
    return this.userService.getOne(userId);
  }

  @Post()
  async create(@Body() user: CreateUserDto): Promise<User> {
    return this.userService.userCreate(user);
  }

  @Put(':id')
  async update(
    @Param('id') userId: number,
    @Body() updatedUser: UpdateUserDto,
  ): Promise<User> {
    return this.userService.userUpdate(userId, updatedUser);
  }

  @Delete(':id')
  async remove(@Param('id') userId: number): Promise<string> {
    return this.userService.userDelete(userId);
  }
}
