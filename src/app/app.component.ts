import { Component } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [HttpClientModule, NgIf],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'API POST Call Demo';
  response: string | null = null;
  error: string | null = null;
  isLoading = false;

  constructor(private readonly http: HttpClient) {}

  callApi(): void {
    this.isLoading = true;
    this.error = null;
    this.response = null;

    const url = 'https://samiulenterprise.com:8081/renter/list';
    const body = {
      "actionType" : 3,
      "service" : "RENTER_LIST",
      "pagination": false
    };
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJraG9rb25hcmlmdWxpc2xhbTY0QGdtYWlsLmNvbSIsImlhdCI6MTc2MTkxNDc1NSwiZXhwIjoxNzYxOTE4MzU1LCJ0eXBlIjoiYWNjZXNzIn0.DAdq4bAhO7CKfEnUaAEqCcomz0bEJsibmjuLrfrS7TA'

    // ✅ Set HTTP headers (including Authorization)
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token
    });

    this.http.post(url, body, { headers }).subscribe({
      next: (data) => {
        this.response = JSON.stringify(data, null, 2);
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = `Failed to fetch data: ${err.message || 'Unknown error'}`;
        this.isLoading = false;
      }
    });
  }
}
