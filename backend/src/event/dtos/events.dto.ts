import { Event } from '@prisma/client';

export class EventsDto {
  total: number;
  events: Event[];
}
