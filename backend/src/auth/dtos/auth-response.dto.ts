export class AuthResponseDto {
  user: {
    id: string;
    username: string;
  };
  token: string;
  refreshToken: string;
}
