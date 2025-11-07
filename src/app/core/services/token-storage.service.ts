import { Injectable } from '@angular/core';

import { AuthResponse } from '../models/auth-response';

@Injectable({ providedIn: 'root' })
export class TokenStorageService {
  private readonly accessKey = 'htally_access';
  private readonly refreshKey = 'htally_refresh';
  private readonly expiryKey = 'htally_access_exp';
  private readonly refreshExpiryKey = 'htally_refresh_exp';

  saveTokens(response: AuthResponse): void {
    const storage = this.getStorage();
    if (!storage) {
      return;
    }

    storage.setItem(this.accessKey, response.token);
    storage.setItem(this.refreshKey, response.refreshToken);
    storage.setItem(this.expiryKey, this.calculateExpiry(response.expiresIn));
    storage.setItem(this.refreshExpiryKey, this.calculateExpiry(response.refreshExpiresIn));
  }

  get accessToken(): string | null {
    return this.getFromStorage(this.accessKey);
  }

  get refreshToken(): string | null {
    return this.getFromStorage(this.refreshKey);
  }

  get isAccessExpired(): boolean {
    return this.isExpired(this.expiryKey);
  }

  get isRefreshExpired(): boolean {
    return this.isExpired(this.refreshExpiryKey);
  }

  clear(): void {
    const storage = this.getStorage();
    if (!storage) {
      return;
    }

    [this.accessKey, this.refreshKey, this.expiryKey, this.refreshExpiryKey].forEach(key =>
      storage.removeItem(key)
    );
  }

  private calculateExpiry(expiresInSeconds: number): string {
    return (Date.now() + expiresInSeconds * 1000).toString();
  }

  private isExpired(key: string): boolean {
    const storage = this.getStorage();
    if (!storage) {
      return true;
    }

    const expiresAt = Number(storage.getItem(key) ?? 0);
    return Date.now() > expiresAt;
  }

  private getFromStorage(key: string): string | null {
    const storage = this.getStorage();
    return storage?.getItem(key) ?? null;
  }

  private getStorage(): Storage | null {
    return typeof window === 'undefined' ? null : window.localStorage;
  }
}
