import { IsString, IsNotEmpty, IsDate } from 'class-validator';

export class EventRequestDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  date: Date;
}
