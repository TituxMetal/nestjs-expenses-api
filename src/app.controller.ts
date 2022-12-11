import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common'

import { AppService } from './app.service'
import { ReportType } from './data'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  private getReportType(type: string) {
    return type === 'incomes' ? ReportType.INCOME : ReportType.EXPENSE
  }

  @Get()
  welcome() {
    return 'Welcome to NestJs'
  }

  @Get('reports/:type')
  getAllReports(@Param('type') type: string) {
    const reportType = this.getReportType(type)

    return this.appService.getAllReports(reportType)
  }

  @Get('reports/:type/:id')
  getReportById(@Param('type') type: string, @Param('id') id: string) {
    const reportType = this.getReportType(type)

    return this.appService.getReportById(reportType, id)
  }

  @Post('reports/:type')
  createReport(
    @Body() { amount, source }: { amount: number; source: string },
    @Param('type') type: string
  ) {
    const reportType = this.getReportType(type)

    return this.appService.createReport({ amount, source }, reportType)
  }

  @Put('reports/:type/:id')
  updateReport(
    @Param('type') type: string,
    @Param('id') id: string,
    @Body() body: { amount: number; source: string }
  ) {
    const reportType = this.getReportType(type)

    return this.appService.updateReport(body, id, reportType)
  }

  @HttpCode(204)
  @Delete('reports/:type/:id')
  deleteReport(@Param('id') id: string) {
    return this.appService.deleteReport(id)
  }
}
