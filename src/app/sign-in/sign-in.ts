
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

// import { AuthService, HouseService, RenterService, TokenStorageService } from '../../app/services';

import { AuthService, TokenStorageService } from './../core/services';

type ApiTarget = 'renters' | 'houses';

interface ApiCallDefinition {
  id: ApiTarget;
  label: string;
  description: string;
}

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule, RouterLink, NgIf ],
  templateUrl: './sign-in.html',
  styleUrls: ['./sign-in.css']
})
export class SignInComponent {
  title = 'Sign In';
  isLoading = false;
  isAuthenticated = false;
  error: string | null = null;
  status: string | null = null;

  credentials = {
    email: '',
    password: ''
  };

  constructor(
    private readonly auth: AuthService,
    private readonly tokens: TokenStorageService,
    private readonly router: Router
  ) {
    this.isAuthenticated = !!this.tokens.accessToken && !this.tokens.isAccessExpired;
    if (this.isAuthenticated) {
      this.status = 'Already logged in.';
    }
  }

  login(): void {
    if (!this.credentials.email || !this.credentials.password) {
      this.error = 'Username and password are required.';
      return;
    }

    this.isLoading = true;
    this.error = null;
    this.status = null;

    this.auth
      .login({
        email: this.credentials.email,
        password: this.credentials.password
      })
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: () => {
          this.isAuthenticated = true;
          this.status = 'Login successful! Redirecting...';

          // ✅ Redirect to dashboard after successful login
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 800); // ছোট delay দিলে UX ভালো লাগে
        },
        error: err => {
          console.error(err);
          this.error = `Login failed: ${err.message || 'Unknown error'}`;
        }
      });
  }
}
