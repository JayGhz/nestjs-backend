import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RoleGuard } from '@/auth/guards/role.guard';
import { AuthGuard } from '@/auth/guards/auth.guard';
import { UsersModule } from '@/users/users.module';
import { SharedModule } from '@/shared/shared.module';
import { AuthController } from '@/auth/auth.controller';
import { AuthService } from '@/auth/auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthGuard, RoleGuard],
  imports: [forwardRef(() => UsersModule), SharedModule, JwtModule.registerAsync
    ({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        global: true,
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    })],
  exports: [AuthService, AuthGuard, RoleGuard, JwtModule],
})
export class AuthModule { }
