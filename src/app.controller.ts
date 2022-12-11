import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'

import { data, ReportType } from './data'

@Controller()
export class AppController {
  @Get()
  welcome() {
    return 'Welcome to NestJs'
  }

  @Get('reports/:type')
  getAllReports(@Param('type') type: string) {
    const reportType = type === 'incomes' ? ReportType.INCOME : ReportType.EXPENSE

    return data.report.filter(report => report.type === reportType)
  }

  @Get('reports/:type/:id')
  getReportById(@Param('type') type: string, @Param('id') id: string) {
    const reportType = type === 'incomes' ? ReportType.INCOME : ReportType.EXPENSE

    return data.report.filter(({ type }) => type === reportType).find(report => report.id === id)
  }

  @Post('reports/:type')
  createReport() {
    return 'Report Created'
  }

  @Put('reports/:type/:id')
  updateReport() {
    return 'Report Updated'
  }

  @Delete('reports/:type/:id')
  deleteReport() {
    return 'Report Deleted'
  }
}
