import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { comparePasswords } from 'src/utils/bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService?: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.getUserByEmail(email);
    if (!user) throw new BadRequestException();

    const isMatch = await comparePasswords(pass, user.password);

    if (!isMatch) throw new UnauthorizedException('please check password');
    return user;
  }

  async generateToken(user: any) {
    return {
      access_token: this.jwtService.sign({
        name: user.name,
        email: user.email,
        phoneNo: user.phoneNo,
        sub: user.id,
      }),
    };
  }
}
