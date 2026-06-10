import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root',
})
export class AgendaService {
  private api = `${API_CONFIG.baseUrl}/agenda`;

  constructor(private http: HttpClient) {}

  listar(): Observable<any[]> {
    return this.http.get<any[]>(this.api);
  }

  salvar(obj: any): Observable<any> {
    return this.http.post(this.api, obj);
  }

  atualizar(id: number, obj: any): Observable<any> {
    return this.http.put(`${this.api}/${id}`, obj);
  }

  remover(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }

  buscarPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.api}/${id}`);
  }
}
