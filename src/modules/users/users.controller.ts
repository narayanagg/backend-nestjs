import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('create')
  @UsePipes(ValidationPipe)
  async createUser(@Body() userDto: CreateUserDto) {
    const result: any = await this.userService.createUser(userDto);
    if (!result.id) {
      throw new InternalServerErrorException('NotCreatedData');
    }
    return { id: result.id, message: 'User Created successfully' };
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    const result = await this.userService.getUserById(id);
    if (!result) {
      throw new NotFoundException('NotFoundData');
    }
    return result;
  }
}
