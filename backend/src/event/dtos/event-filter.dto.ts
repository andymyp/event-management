import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EventFilterDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsDate()
  from?: Date;

  @IsOptional()
  @IsDate()
  to?: Date;

  @IsOptional()
  @IsString()
  sort?: string;

  @IsOptional()
  @IsString()
  order?: 'asc' | 'desc';

  @IsNotEmpty()
  page: number;

  @IsNotEmpty()
  limit: number;
}
