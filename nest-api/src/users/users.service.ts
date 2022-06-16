import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  //Метод создания пользователя
  async userCreate(user: CreateUserDto): Promise<User | HttpException> {
    try {
      const newUser = await this.userRepository.create(user);
      return await this.userRepository.save(newUser);
    }catch (e){
      return new HttpException(e, 400);
    }
  }

  //Метод обновления данных пользователя
  async userUpdate( userId: number, user: UpdateUserDto): Promise<User | HttpException> {
    try {
      await this.userRepository.update(userId, user);
      return await this.userRepository.findOneBy({ id: userId });
    } catch (e) {
      return new HttpException(e, 400);
    }
  }

  //Метод удаления пользователя
  async userDelete(userId: number): Promise<string | HttpException> {
    try {
      await this.userRepository.delete({ id: userId });
      return 'Пользователь удален';
    } catch (e) {
      return new HttpException(e, 400);
    }
  }

  //Метод получения всех пользователей
  async getAll(): Promise<User[] | HttpException> {
    try {
      return await this.userRepository.find({
        relations: {
          subscription: true,
        },
      });
    } catch (e) {
      return new HttpException(e, 400);
    }
  }

  //Метод получения кокнретного пользователя по id
  async getOne(userId: number): Promise<User | HttpException> {
    try {
      return await this.userRepository.findOne({
        relations: { subscription: true },
        where: { id: userId },
      });
    } catch (e) {
      return new HttpException(e, 400);
    }
  }
}
