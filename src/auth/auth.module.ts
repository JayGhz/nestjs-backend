import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { CommonModule } from 'src/common/common.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/jwt.constants';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UsersModule, CommonModule, JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '1h' },
  })],
})
export class AuthModule { }
