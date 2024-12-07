import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { SignUpDto } from './dtos/sign-up.dto';
import { SignInDto } from './dtos/sign-in.dto';
import { AuthResponseDto } from './dtos/auth-response.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  protected readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly config: ConfigService,
    private readonly jwt: JwtService,
    private readonly userService: UserService,
  ) {}

  async signUp(data: SignUpDto): Promise<AuthResponseDto> {
    const exists = await this.userService.findByUsername(data.username);

    if (exists) {
      throw new ConflictException('Username already exists');
    }

    try {
      const user = await this.userService.create({
        ...data,
        password: await bcrypt.hash(data.password, 10),
      });

      const tokens = await this.generateTokens(user.id, user.username);

      const updated = await this.userService.update({
        ...user,
        refreshToken: await bcrypt.hash(tokens.refreshToken, 10),
      });

      return {
        user: {
          id: updated.id,
          username: updated.username,
        },
        ...tokens,
      };
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(error);
    }
  }

  async signIn(data: SignInDto): Promise<AuthResponseDto> {
    const user = await this.userService.findByUsername(data.username);

    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      throw new UnauthorizedException('Username or password wrong');
    }

    try {
      const tokens = await this.generateTokens(user.id, user.username);

      const updated = await this.userService.update({
        ...user,
        refreshToken: await bcrypt.hash(tokens.refreshToken, 10),
      });

      return {
        user: {
          id: updated.id,
          username: updated.username,
        },
        ...tokens,
      };
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(error);
    }
  }

  async refreshToken(username: string, refreshToken: string): Promise<string> {
    const user = await this.userService.findByUsername(username);

    if (
      !user ||
      !user.refreshToken ||
      !(await bcrypt.compare(refreshToken, user.refreshToken))
    ) {
      throw new UnauthorizedException('Access Denied');
    }

    const token = await this.jwt.signAsync({
      id: user.id,
      username: user.username,
    });

    return token;
  }

  private async generateTokens(id: string, username: string) {
    const [token, refreshToken] = await Promise.all([
      this.jwt.signAsync({ id, username }),
      this.jwt.signAsync(
        { id, username },
        {
          expiresIn: this.config.get<string>('JWT_REFRESH_EXPIRES_IN'),
        },
      ),
    ]);

    return {
      token,
      refreshToken,
    };
  }
}
