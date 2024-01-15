import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { CreateAccountController } from './controllers/user/create-account.controller';
import { envSchema } from './env';
import { AuthAccountController } from './controllers/user/auth-account.controller';


@Module({
  imports: [ConfigModule.forRoot({
    validate: (env) => envSchema.parse(env),
    isGlobal: true,
  })],
  controllers: [CreateAccountController, AuthAccountController],
  providers: [PrismaService],
})
export class AppModule {}
