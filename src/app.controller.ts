import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common'
import { v4 as uuid } from 'uuid'

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
  createReport(
    @Body() { amount, source }: { amount: number; source: string },
    @Param('type') type: string
  ) {
    const reportType = type === 'incomes' ? ReportType.INCOME : ReportType.EXPENSE
    const newReport = {
      id: uuid(),
      source,
      amount,
      type: reportType,
      created_at: new Date(),
      updated_at: new Date()
    }
    data.report.push(newReport)

    return newReport
  }

  @Put('reports/:type/:id')
  updateReport(
    @Param('type') type: string,
    @Param('id') id: string,
    @Body() body: { amount: number; source: string }
  ) {
    const reportType = type === 'incomes' ? ReportType.INCOME : ReportType.EXPENSE

    const reportToUpdate = data.report
      .filter(({ type }) => type === reportType)
      .find(report => report.id === id)

    if (!reportToUpdate) return

    const reportIndex = data.report.findIndex(report => report.id === reportToUpdate.id)

    data.report[reportIndex] = {
      ...data.report[reportIndex],
      ...body
    }

    return data.report[reportIndex]
  }

  @HttpCode(204)
  @Delete('reports/:type/:id')
  deleteReport(@Param('id') id: string) {
    const reportIndex = data.report.findIndex(report => report.id === id)

    if (reportIndex === -1) return

    data.report.splice(reportIndex, 1)

    return
  }
}
