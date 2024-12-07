import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EventRequestDto } from './dtos/event-request.dto';
import { EventUpdateDto } from './dtos/event-update.dto';
import { EventFilterDto } from './dtos/event-filter.dto';
import { Event } from '@prisma/client';

@Injectable()
export class EventService {
  protected readonly logger = new Logger(EventService.name);

  constructor(private prisma: PrismaService) {}

  async create(createdBy: string, data: EventRequestDto): Promise<Event> {
    try {
      const event = await this.prisma.event.create({
        data: { ...data, createdBy },
      });

      return event;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(filter: EventFilterDto): Promise<Event[]> {
    try {
      const where = this.whereFilter(filter);

      const events = await this.prisma.event.findMany({
        where,
        include: { user: true },
      });

      return events;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async findMyAll(createdBy: string, filter: EventFilterDto): Promise<Event[]> {
    try {
      const where = this.whereFilter(filter);
      where.AND.push({ createdBy });

      const events = await this.prisma.event.findMany({
        where,
        include: { user: true },
      });

      return events;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: string): Promise<Event> {
    try {
      const event = await this.prisma.event.findUnique({ where: { id } });
      return event;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async update(createdBy: string, data: EventUpdateDto) {
    const event = await this.prisma.event.findUnique({
      where: { id: data.id, createdBy },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    try {
      const updated = await this.prisma.event.update({
        where: { id: data.id, createdBy },
        data,
      });

      return updated;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async remove(createdBy: string, id: string) {
    const event = await this.prisma.event.findUnique({
      where: { id, createdBy },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    try {
      const deleted = await this.prisma.event.delete({
        where: { id, createdBy },
      });

      return deleted;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  private whereFilter(filter: EventFilterDto) {
    const where = {
      AND: [],
    };

    if (filter?.search) {
      where.AND.push({
        title: { contains: filter.search, mode: 'insensitive' },
      });
    }

    if (filter?.from) {
      let dateFilter: any = { gte: filter.from };

      if (filter?.to) {
        dateFilter = { ...dateFilter, lte: filter.to };
      }

      where.AND.push({
        createdAt: dateFilter,
      });
    }

    return where;
  }
}
