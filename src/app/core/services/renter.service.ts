import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';

export interface RenterListRequest {
  actionType: number;
  service: string;
  pagination: boolean;
  pageNo?: number;
  rowCount?: number;
  filters?: Record<string, unknown>;
}
export interface RenterListOverrides extends Partial<RenterListRequest> {}

@Injectable({ providedIn: 'root' })
export class RenterService {
  private readonly listEndpoint = 'renter/list';
  private readonly defaultListRequest: RenterListRequest = {
    actionType: 3,
    service: 'RENTER_LIST',
    pagination: false
  };

  constructor(private readonly api: ApiService) {}

  list<T = unknown>(overrides: RenterListOverrides = {}): Observable<T> {
    const payload: RenterListRequest = {
      ...this.defaultListRequest,
      ...overrides
    };

    return this.api.post<T>(this.listEndpoint, payload);
  }
}
