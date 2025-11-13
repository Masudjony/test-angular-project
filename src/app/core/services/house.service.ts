import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface HouseListRequest {
  actionType: number;
  service: string;
  pagination: boolean;
  pageNo?: number;
  rowCount?: number;
  filters?: Record<string, unknown>;
}
export interface HouseListOverrides extends Partial<HouseListRequest> {}

@Injectable({ providedIn: 'root' })
export class HouseService {
  private readonly listEndpoint = 'house/list';
  private readonly defaultListRequest: HouseListRequest = {
    actionType: 3,
    service: 'HOUSE_LIST',
    pagination: false
  };

   constructor(private readonly api: ApiService) {}

 list<T = unknown>(overrides: HouseListOverrides = {}): Observable<T> {
    const payload: HouseListRequest = {
      ...this.defaultListRequest,
      ...overrides
    };

    return this.api.post<T>(this.listEndpoint, payload);
  }
}
