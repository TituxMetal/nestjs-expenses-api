import { v4 as uuid } from 'uuid'

import { ReportType } from './report.type'

export const data: Data = {
  report: [
    {
      id: uuid(),
      source: 'Salary',
      amount: 7500,
      type: ReportType.INCOME,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuid(),
      source: 'Youtube',
      amount: 2500,
      type: ReportType.INCOME,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuid(),
      source: 'Food',
      amount: 500,
      type: ReportType.EXPENSE,
      created_at: new Date(),
      updated_at: new Date()
    }
  ]
}

interface Data {
  report: {
    id: string
    source: string
    amount: number
    type: ReportType
    created_at: Date
    updated_at: Date
  }[]
}
