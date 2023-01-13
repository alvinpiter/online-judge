import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserFormatter } from './formatters/user.formatter';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, UserFormatter],
  exports: [UsersService, UserFormatter],
  controllers: [UsersController],
})
export class UsersModule {}
