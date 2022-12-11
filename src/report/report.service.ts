import { Injectable } from '@nestjs/common'
import { v4 as uuid } from 'uuid'

import { data, ReportType } from '~/data'

interface Report {
  amount: number
  source: string
}

@Injectable()
export class ReportService {
  getAllReports(reportType: ReportType) {
    return data.report.filter(({ type }) => type === reportType)
  }

  getReportById(reportType: ReportType, reportId: string) {
    return data.report.filter(({ type }) => type === reportType).find(({ id }) => id === reportId)
  }

  createReport({ amount, source }: Report, type: ReportType) {
    const newReport = {
      id: uuid(),
      source,
      amount,
      type,
      created_at: new Date(),
      updated_at: new Date()
    }
    data.report.push(newReport)

    return newReport
  }

  updateReport(payload: Report, reportId: string, reportType: ReportType) {
    const reportToUpdate = data.report
      .filter(({ type }) => type === reportType)
      .find(({ id }) => id === reportId)

    if (!reportToUpdate) return

    const reportIndex = data.report.findIndex(({ id }) => id === reportToUpdate.id)

    data.report[reportIndex] = { ...data.report[reportIndex], ...payload, updated_at: new Date() }

    return data.report[reportIndex]
  }

  deleteReport(reportId: string) {
    const reportIndex = data.report.findIndex(({ id }) => id === reportId)

    if (reportIndex === -1) return

    data.report.splice(reportIndex, 1)

    return {}
  }
}
