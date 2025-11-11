import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RenterService, TokenStorageService, AuthService } from '../../services';
import { finalize, map, switchMap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';

@Component({
  selector: 'app-renter-list',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './renter-list.component.html',
  styleUrls: ['./renter-list.component.css']
})
export class RenterListComponent implements OnInit {
  renters: any[] = [];
  error: string | null = null;
  isLoading = false;
  isAuthenticated = false;

  constructor(
    private readonly rentersService: RenterService,
    private readonly tokens: TokenStorageService,
    private readonly auth: AuthService
  ) {}

  ngOnInit(): void {
    this.isAuthenticated = !!this.tokens.accessToken && !this.tokens.isAccessExpired;
    if (this.isAuthenticated) {
      this.fetchRenters();
    }
  }

  fetchRenters(): void {
    this.isLoading = true;
    this.error = null;

    this.ensureAuthenticated()
      .pipe(
        switchMap(() => this.rentersService.list()),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (data: any) => {
          this.renters = data;
        },
        error: (err) => {
          console.error(err);
          this.error = `Failed to fetch renter list: ${err.message || 'Unknown error'}`;
        }
      });
  }

  private ensureAuthenticated(): Observable<void> {
    if (this.tokens.accessToken && !this.tokens.isAccessExpired) {
      return of(void 0);
    }
    return throwError(() => new Error('Authentication required'));
  }
}
