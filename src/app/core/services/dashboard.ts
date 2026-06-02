import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {

   private api = `${API_CONFIG.baseUrl}/dashboard`;

  constructor(
    private http: HttpClient
  ) {}

  buscarTotais() {

    return this.http.get<any>(this.api);
  }
}
