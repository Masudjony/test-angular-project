import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HouseService, TokenStorageService } from '../core/services';
import { finalize } from 'rxjs/operators';
import { Nav } from '../nav/nav';
import { TopHeader } from '../top-header/top-header';

interface House {
  id: number;
  accountId: number;
  houseName: string;
  houseNo: string;
  houseAddress: string;
  totalFloor: number;
  totalFlat: number;
  status: number;
  createdOn: string;
  updatedOn: string | null;
  actionType: any;
  appUser: any;
}

interface ApiResponse {
  code: string;
  message: string;
  refId: string | null;
  totalRows: number;
  data: House[];
  totals: any;
}

@Component({
  selector: 'app-house-list',
  standalone: true,
  imports: [CommonModule, Nav, TopHeader],
  templateUrl: './house.html',
  styleUrls: ['./house.css'],
})
export class HouseComponent implements OnInit {
  isAuthenticated = false;
  isLoading = false;
  houseList: any[] = [];
  error: string | null = null;
  status: string | null = null;

  constructor(
    private readonly houses: HouseService,
    private readonly tokens: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.isAuthenticated = !!this.tokens.accessToken && !this.tokens.isAccessExpired;
    if (this.isAuthenticated) {
      this.status = 'Loading house list...';
      this.fetchHouses();
    } else {
      this.error = 'Please log in first.';
    }
  }

  fetchHouses(): void {
    this.isLoading = true;
    this.error = null;
    this.houseList = [];

    this.houses.list<ApiResponse>()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (res) => {
          if (res && res.code === '000') {
            this.houseList = res.data || [];
            this.status = `Total houses: ${res.totalRows}`;
          } else {
            this.error = res?.message || 'Unknown error occurred.';
          }
        },
        error: (err) => {
          this.error = err.message || 'Error fetching houses';
        },
      });
  }
}
