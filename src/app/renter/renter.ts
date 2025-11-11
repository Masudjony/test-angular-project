
import { FormsModule } from '@angular/forms';
import { finalize, map, switchMap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { Component } from '@angular/core';
import { AuthService, HouseService, RenterService, TokenStorageService } from './../core/services';
import { Nav } from '../nav/nav';
import { TopHeader } from '../top-header/top-header';
import { NgFor, NgIf } from '@angular/common';

type ApiTarget = 'renters' | 'houses';

interface ApiCallDefinition {
  id: ApiTarget;
  label: string;
  description: string;
}

@Component({
  selector: 'app-renter',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, Nav, TopHeader,],
  templateUrl: './renter.html',
  styleUrl: './renter.css',
})
export class RenterComponent {

  title = 'API POST Call Demo';
  response: string | null = null;
  error: string | null = null;
  isLoading = false;
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

  callApi(target: ApiTarget): void {
    const hasStoredToken = !!this.tokens.accessToken && !this.tokens.isAccessExpired;

    if (!hasStoredToken) {
      this.error = 'You must be authenticated to call the API.';
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

    return throwError(() => new Error('Not authenticated. Please sign in first.'));
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
