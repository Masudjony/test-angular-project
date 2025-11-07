import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';

export interface FetchListRequest {
  actionType: number;
  service: string;
  pagination: boolean;
  pageNo?: number;
  rowCount?: number;
  filters?: Record<string, unknown>;
}
export interface FetchListOverrides extends Partial<FetchListRequest> {}

export interface FetchListResponse<T = unknown> {
  data: T[];
  total: number;
}

@Injectable({ providedIn: 'root' })
export class HouseService {
  private readonly listEndpoint = 'house/list';
  private readonly defaultListRequest: FetchListRequest = {
    actionType: 3,
    service: 'HOUSE_LIST',
    pagination: false
  };

  constructor(private api: ApiService) {}

  list<T = unknown>(params: FetchListOverrides = {}): Observable<FetchListResponse<T>> {
    const payload: FetchListRequest = {
      ...this.defaultListRequest,
      ...params
    };

    return this.api.post<FetchListResponse<T>>(this.listEndpoint, payload);
  }
}
