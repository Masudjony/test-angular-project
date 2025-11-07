import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { finalize, map, switchMap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';

import { AuthService, HouseService, RenterService, TokenStorageService } from './core/services';

type ApiTarget = 'renters' | 'houses';

interface ApiCallDefinition {
  id: ApiTarget;
  label: string;
  description: string;
}
@Component({
  selector: 'app-root',
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'API POST Call Demo';
  response: string | null = null;
  error: string | null = null;
  isLoading = false;
  credentials = {
    email: '',
    password: ''
  };
  isAuthenticated = false;
  status: string | null = null;

  readonly apiCalls: ApiCallDefinition[] = [
    {
      id: 'renters',
      label: 'Fetch renter list',
      description: 'Call the renter list endpoint.'
    },
    {
      id: 'houses',
      label: 'Fetch house list',
      description: 'Call the house list endpoint.'
    }
  ];
  constructor(
    private readonly auth: AuthService,
    private readonly houses: HouseService,
    private readonly renters: RenterService,
    private readonly tokens: TokenStorageService
  ) {
    this.isAuthenticated = !!this.tokens.accessToken && !this.tokens.isAccessExpired;
    if (this.isAuthenticated) {
      this.status = 'Existing session detected. Choose an API call to execute.';
    }
  }

  login(): void {
    if (!this.credentials.email || !this.credentials.password) {
      this.error = 'Username and password are required.';
      return;
    }

    this.isLoading = true;
    this.error = null;
    this.response = null;
      this.status = null;

      this.auth
        .login({
          email: this.credentials.email,
          password: this.credentials.password
        })
        .pipe(
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe({
          next: () => {
            this.isAuthenticated = true;
            this.status = 'Login successful. Choose an API call to execute.';
          },
          error: err => {
            console.error(err);
            this.error = `Login failed: ${err.message || 'Unknown error'}`;
          }
        });
    }

    callApi(target: ApiTarget): void {
      const hasStoredToken = !!this.tokens.accessToken && !this.tokens.isAccessExpired;
      const hasCredentials = !!this.credentials.email && !!this.credentials.password;

      if (!hasCredentials && !hasStoredToken) {
      this.error = 'Username and password are required to authenticate the request.';
      return;
    }

    this.isLoading = true;
    this.error = null;
    this.response = null;
    this.status = null;

    this.ensureAuthenticated()
      .pipe(
        switchMap(() => this.invoke(target)),
        map(data => JSON.stringify(data, null, 2)),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: response => {
          this.response = response;
        },
        error: err => {
          console.error(err);
          this.error = `Failed to fetch data: ${err.message || 'Unknown error'}`;
        }
      });
  }

  private ensureAuthenticated(): Observable<void> {
      if (this.tokens.accessToken && !this.tokens.isAccessExpired) {
      return of(void 0);
    }

    if (!this.credentials.email || !this.credentials.password) {
      return throwError(() => new Error('Missing credentials'));
    }

    return this.auth
      .login({
        email: this.credentials.email,
        password: this.credentials.password
      })
      .pipe(
        map(() => {
          this.isAuthenticated = true;
          return void 0;
        })
      );
  }
  private invoke(target: ApiTarget): Observable<unknown> {
    switch (target) {
      case 'renters':
        return this.renters.list();
      case 'houses':
        return this.houses.list();
      default:
        return throwError(() => new Error('Unknown API target'));
    }
  }
}
