import { Injectable } from '@nestjs/common'
import { v4 as uuid } from 'uuid'

import { data, ReportType } from '~/data'

import { ReportResponseDto } from './dto'

interface CreateReport {
  amount: number
  source: string
}

interface UpdateReport {
  amount?: number
  source?: string
}

@Injectable()
export class ReportService {
  getAllReports(reportType: ReportType): ReportResponseDto[] {
    const reports = data.report.filter(({ type }) => type === reportType)

    return reports.map(report => new ReportResponseDto(report))
  }

  getReportById(reportType: ReportType, reportId: string): ReportResponseDto {
    const report = data.report
      .filter(({ type }) => type === reportType)
      .find(({ id }) => id === reportId)

    if (!report) return

    return new ReportResponseDto(report)
  }

  createReport({ amount, source }: CreateReport, type: ReportType): ReportResponseDto {
    const newReport = {
      id: uuid(),
      source,
      amount,
      type,
      created_at: new Date(),
      updated_at: new Date()
    }
    data.report.push(newReport)

    return new ReportResponseDto(newReport)
  }

  updateReport(payload: UpdateReport, reportId: string, reportType: ReportType): ReportResponseDto {
    const reportToUpdate = data.report
      .filter(({ type }) => type === reportType)
      .find(({ id }) => id === reportId)

    if (!reportToUpdate) return

    const reportIndex = data.report.findIndex(({ id }) => id === reportToUpdate.id)

    data.report[reportIndex] = { ...data.report[reportIndex], ...payload, updated_at: new Date() }

    return new ReportResponseDto(data.report[reportIndex])
  }

  deleteReport(reportId: string) {
    const reportIndex = data.report.findIndex(({ id }) => id === reportId)

    if (reportIndex === -1) return

    data.report.splice(reportIndex, 1)

    return {}
  }
}
