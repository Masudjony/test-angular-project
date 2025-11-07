import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

export interface RequestOptions {
  headers?: HttpHeaders | { [header: string]: string | string[] };
  context?: HttpContext;
  params?: HttpParams | { [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean> };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly baseUrl = environment.apiBaseUrl.replace(/\/+$/, '');

  constructor(private http: HttpClient) {}

  post<T>(endpoint: string, body: unknown, options?: RequestOptions): Observable<T> {
    return this.http.post<T>(this.buildUrl(endpoint), body, options);
  }

  private buildUrl(endpoint: string): string {
    if (this.isAbsolute(endpoint)) {
      return endpoint;
    }

    const sanitizedEndpoint = endpoint.replace(/^\/+/, '');
    return `${this.baseUrl}/${sanitizedEndpoint}`;
  }

  private isAbsolute(endpoint: string): boolean {
    return /^(https?:)?\/\//i.test(endpoint);
  }
}
