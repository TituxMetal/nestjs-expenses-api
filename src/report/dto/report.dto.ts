import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator'

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
