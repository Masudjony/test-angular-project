import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';

export interface FetchListRequest {
  actionType: number;
  service: string;
  pagination: boolean;
  pageNo: number;
  rowCount: number;
  filters?: Record<string, unknown>;
}

export interface FetchListResponse<T = unknown> {
  data: T[];
  total: number;
}

@Injectable({ providedIn: 'root' })
export class HouseService {
  private readonly listEndpoint = 'house/list';

  constructor(private api: ApiService) {}

  list<T = unknown>(params: FetchListRequest): Observable<FetchListResponse<T>> {
    return this.api.post<FetchListResponse<T>>(this.listEndpoint, params);
  }
}
