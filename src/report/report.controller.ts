import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common'

import { ReportType } from '~/data'

import { ReportService } from './report.service'

@Controller('reports/:type')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  private getReportType(type: string) {
    return type === 'incomes' ? ReportType.INCOME : ReportType.EXPENSE
  }

  @Get()
  getAllReports(@Param('type') type: string) {
    const reportType = this.getReportType(type)

    return this.reportService.getAllReports(reportType)
  }

  @Get(':id')
  getReportById(@Param('type') type: string, @Param('id') id: string) {
    const reportType = this.getReportType(type)

    return this.reportService.getReportById(reportType, id)
  }

  @Post()
  createReport(
    @Body() { amount, source }: { amount: number; source: string },
    @Param('type') type: string
  ) {
    const reportType = this.getReportType(type)

    return this.reportService.createReport({ amount, source }, reportType)
  }

  @Put(':id')
  updateReport(
    @Param('type') type: string,
    @Param('id') id: string,
    @Body() body: { amount: number; source: string }
  ) {
    const reportType = this.getReportType(type)

    return this.reportService.updateReport(body, id, reportType)
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(@Param('id') id: string) {
    return this.reportService.deleteReport(id)
  }
}
