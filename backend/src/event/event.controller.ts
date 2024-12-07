import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { EventService } from './event.service';
import { EventRequestDto } from './dtos/event-request.dto';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access.guard';
import { Request } from 'express';
import { EventFilterDto } from './dtos/event-filter.dto';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @UseGuards(JwtAccessGuard)
  async create(@Req() req: Request, @Body() data: EventRequestDto) {
    const response = await this.eventService.create(req.user['id'], data);
    return response;
  }

  @Get()
  @UseGuards(JwtAccessGuard)
  async findAll(@Query() filter: EventFilterDto) {
    const response = await this.eventService.findAll(filter);
    return response;
  }

  @Get('my-events')
  @UseGuards(JwtAccessGuard)
  async findMyAll(@Req() req: Request, @Query() filter: EventFilterDto) {
    const response = await this.eventService.findMyAll(req.user['id'], filter);
    return response;
  }

  @Get(':id')
  @UseGuards(JwtAccessGuard)
  async findOne(@Param('id') id: string) {
    const response = await this.eventService.findOne(id);
    return response;
  }

  @Patch(':id')
  @UseGuards(JwtAccessGuard)
  async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() data: EventRequestDto,
  ) {
    const response = await this.eventService.update(req.user['id'], {
      ...data,
      id,
    });

    return response;
  }

  @Delete(':id')
  @UseGuards(JwtAccessGuard)
  async remove(@Req() req: Request, @Param('id') id: string) {
    const response = await this.eventService.remove(req.user['id'], id);
    return response;
  }
}
