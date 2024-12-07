import { PartialType } from '@nestjs/mapped-types';
import { EventRequestDto } from './event-request.dto';
import { IsUUID } from 'class-validator';

export class EventUpdateDto extends PartialType(EventRequestDto) {
  @IsUUID()
  id: string;
}
