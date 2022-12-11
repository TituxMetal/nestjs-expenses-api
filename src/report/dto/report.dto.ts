import { Exclude, Expose } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator'

import { ReportType } from '~/data'

export class CreateReportDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  amount: number

  @IsString()
  @IsNotEmpty()
  source: string
}

export class UpdateReportDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @IsOptional()
  amount?: number

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  source?: string
}

export class ReportResponseDto {
  id: string
  source: string
  amount: number
  type: ReportType

  @Exclude()
  created_at: Date

  @Exclude()
  updated_at: Date

  @Expose({ name: 'createdAt' })
  transformCreatedAt() {
    return this.created_at
  }

  constructor(partial: Partial<ReportResponseDto>) {
    Object.assign(this, partial)
  }
}
