import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '@/auth/constants/jwt.constants';
import { RoleGuard } from '@/auth/guards/role.guard';
import { AuthGuard } from '@/auth/guards/auth.guard';
import { UsersModule } from '@/users/users.module';
import { SharedModule } from '@/shared/shared.module';
import { AuthController } from '@/auth/auth.controller';
import { AuthService } from '@/auth/auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthGuard, RoleGuard],
  imports: [forwardRef(() => UsersModule), SharedModule, JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '1h' },
  })],
  exports: [AuthService, AuthGuard, RoleGuard, JwtModule],
})
export class AuthModule { }
