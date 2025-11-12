
import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { HouseService, TokenStorageService } from '../core/services';
import { finalize, map } from 'rxjs/operators';
import { Nav } from '../nav/nav';
import { TopHeader } from '../top-header/top-header';

@Component({
  selector: 'app-house',
  imports: [Nav, TopHeader],
  templateUrl: './house.html',
  styleUrl: './house.css',
})
export class House {
  isAuthenticated = false;
  isLoading = false;
  response: string | null = null;
  error: string | null = null;
  status: string | null = null;

  constructor(
    private readonly houses: HouseService,
    private readonly tokens: TokenStorageService
  ) {
    this.isAuthenticated = !!this.tokens.accessToken && !this.tokens.isAccessExpired;
    if (this.isAuthenticated) this.status = 'You can fetch the house list.';
  }

  fetchHouses(): void {
    if (!this.isAuthenticated) {
      this.error = 'Please log in first.';
      return;
    }

    this.isLoading = true;
    this.error = null;
    this.response = null;
    this.status = null;

    this.houses.list()
      .pipe(
        map(data => JSON.stringify(data, null, 2)),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: res => (this.response = res),
        error: err => (this.error = err.message || 'Error fetching houses'),
      });
  }
}
