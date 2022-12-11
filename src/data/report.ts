import { ReportType } from './report.type'

export const data: Data = {
  report: [
    {
      id: 'uuid1',
      source: 'Salary',
      amount: 7500,
      type: ReportType.INCOME,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 'uuid2',
      source: 'Youtube',
      amount: 2500,
      type: ReportType.INCOME,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 'uuid3',
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
