import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../authentication/guards/jwt.guard';
import { UserRegistrationDto } from './data-transfer-objects/user-registration.dto';
import { UserFormatter } from './formatters/user.formatter';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('api')
export class UsersController {
  constructor(
    private readonly userFormatter: UserFormatter,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(JwtGuard)
  @Get('current-user')
  async currentUser(@Request() request) {
    const user: User = request.user;
    return this.userFormatter.format(user);
  }

  @Get('users/:userId')
  async getUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.userFormatter.format(await this.usersService.findById(userId));
  }

  @Post('users')
  async registerUser(@Body() userRegistrationDto: UserRegistrationDto) {
    return this.userFormatter.format(
      await this.usersService.registerUser(userRegistrationDto),
    );
  }
}
