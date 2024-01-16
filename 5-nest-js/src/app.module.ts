import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { CreateAccountController } from './controllers/user/create-account.controller';
import { envSchema } from './env';
import { AuthAccountController } from './controllers/user/auth-account.controller';
import { AuthModule } from './auth/auth.module';
import { CreateQuestionController } from './controllers/question/create-question.controller';


@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }), 
    AuthModule
  ],
  controllers: [CreateAccountController, AuthAccountController, CreateQuestionController],
  providers: [PrismaService],
})
export class AppModule {}
