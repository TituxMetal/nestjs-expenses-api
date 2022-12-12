import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { PrismaModule } from '~/prisma'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ReportModule } from './report'
import { SummaryModule } from './summary'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    PrismaModule,
    ReportModule,
    SummaryModule
  ],
  providers: [AppService],
  controllers: [AppController]
})
export class AppModule {}
