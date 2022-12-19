import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../authentication/guards/jwt.guard';
import { UserEntity } from './user.entity';

@Controller('api')
export class UsersController {
  @UseGuards(JwtGuard)
  @Get('me')
  me(@Request() request) {
    const user: UserEntity = request.user;
    return { username: user.username };
  }
}
