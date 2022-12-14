import { Body, Controller, Post } from '@nestjs/common';
import { UsernameAndPasswordDoNotMatchError } from 'src/errors/UsernameAndPasswordDoNotMatchError';
import { SignInDto } from './sign-in.dto';

@Controller('api')
export class AuthenticationController {
  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto) {
    const users: Array<SignInDto> = [
      {
        username: 'alvin',
        password: 'password',
      },
    ];

    const user = users.find((user) => user.username === signInDto.username);

    if (!user || user.password !== signInDto.password) {
      throw new UsernameAndPasswordDoNotMatchError();
    }

    return {
      jwt: 'this_is_supposed_to_be_a_jwt',
    };
  }
}
