import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EventFilterDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  from?: Date;

  @IsOptional()
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
