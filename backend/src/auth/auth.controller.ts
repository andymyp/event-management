import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/sign-up.dto';
import { SignInDto } from './dtos/sign-in.dto';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() data: SignUpDto) {
    const response = await this.authService.signUp(data);
    return response;
  }

  @Post('sign-in')
  async signIn(@Body() data: SignInDto) {
    const response = await this.authService.signIn(data);
    return response;
  }

  @Get('refresh-token')
  @UseGuards(JwtRefreshGuard)
  async refreshToken(@Req() req: Request) {
    const response = await this.authService.refreshToken(
      req.user['username'],
      req.user['refreshToken'],
    );

    return response;
  }
}
