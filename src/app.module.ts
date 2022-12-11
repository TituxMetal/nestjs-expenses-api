import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { PrismaModule } from '~/prisma'

import { AppController } from './app.controller'

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, cache: true }), PrismaModule],
  controllers: [AppController]
})
export class AppModule {}
