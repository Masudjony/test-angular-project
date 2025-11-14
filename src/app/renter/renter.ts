import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RenterService, TokenStorageService } from '../core/services';
import { finalize } from 'rxjs/operators';
import { Nav } from '../nav/nav';
import { TopHeader } from '../top-header/top-header';


interface Renter {
  id: number;
  accountId: number;
  renterName: string;
  renterMobile: string;
  renterEmail: string;
  renterPhotoIdNo: string;
  renterPermanentAddress: string;
  renterPreviousAddress: string;
  attachments: any[];
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
  data: Renter[];
  totals: any;
}

@Component({
  selector: 'app-renter-list',
  standalone: true,
  imports: [CommonModule, Nav, TopHeader],
  templateUrl: './renter.html',
  styleUrls: ['./renter.css'],
})
export class RenterComponent implements OnInit {
  isAuthenticated = false;
  isLoading = false;
  rentersList: any[] = [];
  error: string | null = null;
  status: string | null = null;

  constructor(
    private readonly renters: RenterService,
    private readonly tokens: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.isAuthenticated = !!this.tokens.accessToken && !this.tokens.isAccessExpired;
    if (this.isAuthenticated) {
      this.status = 'Loading renter list...';
      this.fetchRenters();
    } else {
      this.error = 'Please log in first.';
    }
  }

  fetchRenters(): void {
    this.isLoading = true;
    this.error = null;
    this.rentersList = [];

    this.renters.list<ApiResponse>()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (res) => {
          if (res && res.code === '000') {
            this.rentersList = res.data || [];

            // 🔥 Console Print All Renter Data
            console.log('Renter Full Data:', this.rentersList);

            this.status = `Total renters: ${res.totalRows}`;
          } else {
            this.error = res?.message || 'Unknown error occurred.';
          }
        },
        error: (err) => {
          this.error = err.message || 'Error fetching renters';
        },
      });
  }



}
