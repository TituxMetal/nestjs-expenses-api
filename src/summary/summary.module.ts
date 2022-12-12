import { Module } from '@nestjs/common'

import { ReportModule } from '~/report'

import { SummaryController } from './summary.controller'
import { SummaryService } from './summary.service'

@Module({
  imports: [ReportModule],
  providers: [SummaryService],
  controllers: [SummaryController]
})
export class SummaryModule {}
