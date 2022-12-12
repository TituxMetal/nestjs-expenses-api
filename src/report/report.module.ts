import { ClassSerializerInterceptor, Module } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'

import { ReportController } from './report.controller'
import { ReportService } from './report.service'

@Module({
  providers: [
    ReportService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor
    }
  ],
  controllers: [ReportController],
  exports: [ReportService]
})
export class ReportModule {}
