import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseEnumPipe,
  ParseUUIDPipe,
  Post,
  Put
} from '@nestjs/common'

import { ReportType } from '~/data'

import { CreateReportDto, UpdateReportDto } from './dto'
import { ReportService } from './report.service'

@Controller('reports/:type')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  private getReportType(type: string) {
    return type === 'income' ? ReportType.INCOME : ReportType.EXPENSE
  }

  @Get()
  getAllReports(@Param('type', new ParseEnumPipe(ReportType)) type: string) {
    const reportType = this.getReportType(type)

    return this.reportService.getAllReports(reportType)
  }

  @Get(':id')
  getReportById(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string
  ) {
    const reportType = this.getReportType(type)

    return this.reportService.getReportById(reportType, id)
  }

  @Post()
  createReport(
    @Body() { amount, source }: CreateReportDto,
    @Param('type', new ParseEnumPipe(ReportType)) type: string
  ) {
    const reportType = this.getReportType(type)

    return this.reportService.createReport({ amount, source }, reportType)
  }

  @Put(':id')
  updateReport(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateReportDto
  ) {
    const reportType = this.getReportType(type)

    return this.reportService.updateReport(body, id, reportType)
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(@Param('id', ParseUUIDPipe) id: string) {
    return this.reportService.deleteReport(id)
  }
}
