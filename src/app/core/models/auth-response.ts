export interface AuthResponse {
  token: string;
  refreshToken: string;
  expiresIn: number;
  refreshExpiresIn: number;
}
