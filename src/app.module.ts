import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { parse } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    autoLoadEntities: true,
    synchronize: true,
    ssl: process.env.MYSQL_SSL === 'true',
    extra: {
      ssl: 
        process.env.MYSQL_SSL === 'true' 
          ? { 
              rejectUnauthorized: false 
            } 
          : null,
    },
  }),
  EventsModule,
  UsersModule,
  AuthModule,
],
  controllers: [],
  providers: [],
})
export class AppModule {}
