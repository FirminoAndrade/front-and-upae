import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { RegistroDiario } from '../../shared/models/diaria.model';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root',
})
export class DiariaService {

 private api = `${API_CONFIG.baseUrl}/diarias`;

  constructor(
    private http: HttpClient
  ) {}

  listar(): Observable<RegistroDiario[]> {

    return this.http.get<RegistroDiario[]>(
      this.api
    );
  }

 buscarPorId(id: number) {
  return this.http.get<any>(`${this.api}/${id}`);
}

  salvar(
    diaria: RegistroDiario
  ): Observable<RegistroDiario> {

    return this.http.post<RegistroDiario>(
      this.api,
      diaria
    );
  }

  atualizar(
    id: number,
    diaria: RegistroDiario
  ): Observable<RegistroDiario> {

    return this.http.put<RegistroDiario>(
      `${this.api}/${id}`,
      diaria
    );
  }

  remover(id: number): Observable<void> {

    return this.http.delete<void>(
      `${this.api}/${id}`
    );
  }
}

