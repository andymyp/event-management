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
import { EventsDto } from './dtos/events.dto';

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
      this.logger.error(error.message);
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(filter: EventFilterDto): Promise<EventsDto> {
    try {
      const where = this.whereFilter(filter);

      const { sort = 'createdAt', order = 'desc' } = filter;

      const skip = (Number(filter.page) - 1) * Number(filter.limit);

      const [total, events] = await Promise.all([
        this.prisma.event.count({ where }),
        this.prisma.event.findMany({
          where,
          orderBy: { [sort]: order },
          skip: skip,
          take: Number(filter.limit),
          include: { user: { select: { id: true, username: true } } },
        }),
      ]);

      return { total, events };
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(error);
    }
  }

  async findMyAll(
    createdBy: string,
    filter: EventFilterDto,
  ): Promise<EventsDto> {
    try {
      const where = this.whereFilter(filter);
      where.createdBy = createdBy;

      const { sort = 'createdAt', order = 'desc' } = filter;

      const skip = (Number(filter.page) - 1) * Number(filter.limit);

      const [total, events] = await Promise.all([
        this.prisma.event.count({ where }),
        this.prisma.event.findMany({
          where,
          orderBy: { [sort]: order },
          skip: skip,
          take: Number(filter.limit),
        }),
      ]);

      return { total, events };
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: string): Promise<Event> {
    try {
      const event = await this.prisma.event.findUnique({
        where: { id },
        include: { user: { select: { id: true, username: true } } },
      });

      return event;
    } catch (error) {
      this.logger.error(error.message);
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
      this.logger.error(error.message);
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
      this.logger.error(error.message);
      throw new InternalServerErrorException(error);
    }
  }

  private whereFilter(filter: EventFilterDto) {
    const where: any = {};

    if (filter?.search) {
      where.OR = [
        { title: { contains: filter.search, mode: 'insensitive' } },
        { description: { contains: filter.search, mode: 'insensitive' } },
      ];
    }

    if (filter?.from) {
      let dateFilter: any = { gte: filter.from };

      if (filter?.to) {
        dateFilter = { ...dateFilter, lte: filter.to };
      }

      where.createdAt = dateFilter;
    }

    return where;
  }
}
