import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dtos/user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  protected readonly logger = new Logger(UserService.name);

  constructor(private prisma: PrismaService) {}

  async create(data: UserDto): Promise<User> {
    try {
      const user = await this.prisma.user.create({ data });
      return user;
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(error);
    }
  }

  async update(data: Partial<UserDto>): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id: data.id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID "${data.id}" not found`);
    }

    try {
      const updated = this.prisma.user.update({
        where: { id: user.id },
        data,
      });

      return updated;
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(error);
    }
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });

    return user;
  }
}
