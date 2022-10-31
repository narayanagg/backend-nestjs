import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { encodePassword } from 'src/utils/bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(user: CreateUserDto) {
    const hashedPassword = await encodePassword(user.password);
    return await this.userRepository.save({
      ...user,
      password: hashedPassword,
    });
  }

  async getUserById(id: number) {
    return await this.userRepository.findOne({
      where: { id },
      select: { id: true, name: true, phoneNo: true, email: true },
    });
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
    });
  }
}
