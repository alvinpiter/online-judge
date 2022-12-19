import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { LocalGuard } from './guards/local.guard';

@Controller('api')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('sign-in')
  @UseGuards(LocalGuard)
  async signIn(@Request() request) {
    const jwt = await this.authenticationService.generateAccessToken(
      request.user,
    );
    return { jwt };
  }
}
