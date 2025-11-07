import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { AuthResponse } from '../models/auth-response';
import { TokenStorageService } from './token-storage.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly api = `${environment.apiBaseUrl}/auth`;

  constructor(private http: HttpClient, private tokens: TokenStorageService) {}

  login(credentials: { username: string; password: string }) {
    return this.http.post<AuthResponse>(`${this.api}/token`, credentials).pipe(
      tap(response => this.tokens.saveTokens(response))
    );
  }

  refresh() {
    const refreshToken = this.tokens.refreshToken;
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }

    return this.http
      .post<AuthResponse>(`${this.api}/refresh`, { refreshToken })
      .pipe(tap(response => this.tokens.saveTokens(response)));
  }

  logout(): void {
    this.tokens.clear();
  }
}
