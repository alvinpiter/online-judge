import { Controller, Post, Request, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthenticationService } from './authentication.service';
import { ACCESS_TOKEN_KEY } from './constants';
import { LocalGuard } from './guards/local.guard';

@Controller('api')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('sign-in')
  @UseGuards(LocalGuard)
  async signIn(
    @Request() request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const accessToken = await this.authenticationService.generateAccessToken(
      request.user,
    );

    response.cookie(ACCESS_TOKEN_KEY, accessToken);

    return { [ACCESS_TOKEN_KEY]: accessToken };
  }

  @Post('sign-out')
  async signOut(@Res({ passthrough: true }) response: Response) {
    response.cookie(ACCESS_TOKEN_KEY, '', { maxAge: 0 });
    return 'ok';
  }
}
