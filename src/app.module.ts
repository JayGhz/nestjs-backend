import { Module } from '@nestjs/common';
import { UsersModule } from '@/users/users.module';
import { AuthModule } from '@/auth/auth.module';
import { CustomersModule } from '@/customers/customers.module';
import { VetsModule } from '@/vets/vets.module';
import { SheltersModule } from '@/shelters/shelters.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '@/shared/shared.module';
import { PetsModule } from '@/pets/pets.module';
import { BreedsModule } from '@/breeds/breeds.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
      ssl: process.env.POSTGRES_SSL === 'true',
      extra: {
        ssl: process.env.POSTGRES_SSL === 'true'
          ? { rejectUnauthorized: false }
          : null,
      },
    }),
    UsersModule,
    AuthModule,
    CustomersModule,
    VetsModule,
    SheltersModule,
    SharedModule,
    PetsModule,
    BreedsModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule { }
