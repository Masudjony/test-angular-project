import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, finalize, switchMap, take } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private readonly refreshSubject = new BehaviorSubject<string | null>(null);

  constructor(private tokens: TokenStorageService, private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.isAuthEndpoint(req)) {
      return next.handle(req);
    }

    const tokenizedRequest = this.addToken(req, this.tokens.accessToken);

    return next.handle(tokenizedRequest).pipe(
      catchError(error => this.handleAuthError(error, req, next))
    );
  }

  private handleAuthError(
    error: unknown,
    originalReq: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!(error instanceof HttpErrorResponse) || error.status !== 401) {
      return throwError(() => error);
    }

    if (!this.tokens.refreshToken || this.tokens.isRefreshExpired) {
      this.tokens.clear();
      return throwError(() => error);
    }

    if (this.isRefreshing) {
      return this.refreshSubject.pipe(
        filter((token): token is string => token !== null),
        take(1),
        switchMap(token => next.handle(this.addToken(originalReq, token)))
      );
    }

    this.isRefreshing = true;
    this.refreshSubject.next(null);

    return this.auth.refresh().pipe(
      switchMap(() => {
        const newToken = this.tokens.accessToken;
        if (!newToken) {
          this.tokens.clear();
          return throwError(() => new Error('No access token present after refresh'));
        }
        this.refreshSubject.next(newToken);
        return next.handle(this.addToken(originalReq, newToken));
      }),
      catchError(refreshError => {
        this.tokens.clear();
        return throwError(() => refreshError);
      }),
      finalize(() => {
        this.isRefreshing = false;
      })
    );
  }

  private addToken(req: HttpRequest<any>, token: string | null): HttpRequest<any> {
    if (!token) {
      return req;
    }

    return req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  private isAuthEndpoint(req: HttpRequest<any>): boolean {
    return /\/auth\//.test(req.url);
  }
}

export const AUTH_INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
};
