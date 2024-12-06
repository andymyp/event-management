import { IsString, IsNotEmpty, IsUUID, MinLength } from 'class-validator';

export class UserDto {
  @IsUUID()
  id?: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsString()
  refreshToken?: string;
}
