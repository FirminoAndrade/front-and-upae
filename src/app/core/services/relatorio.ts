import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root',
})
export class RelatorioService {

 private api = `${API_CONFIG.baseUrl}/relatorios`;

  constructor(
    private http: HttpClient
  ) {}

  buscarPorPeriodo(
    dataInicio: string,
    dataFim: string
  ): Observable<any[]> {

    return this.http.get<any[]>(

      `${this.api}/periodo?dataInicio=${dataInicio}&dataFim=${dataFim}`
    );
  }
}
