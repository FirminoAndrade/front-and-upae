import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Profissional } from '../../shared/models/profissional';

@Injectable({
  providedIn: 'root',
})
export class ProfissionalService {

    private api = `${API_CONFIG.baseUrl}/profissionais`;

  constructor(
    private http: HttpClient
  ) {}

  listar(): Observable<Profissional[]> {

    return this.http.get<Profissional[]>(
      this.api
    );
  }

  salvar(
    profissional: any
  ): Observable<any> {

    return this.http.post<any>(
      this.api,
      profissional
    );
  }

  remover(id: number): Observable<void> {

    return this.http.delete<void>(
      `${this.api}/${id}`
    );
  }

  buscarPorEspecialidade(especialidadeId: number): Observable<Profissional[]> {

    return this.http.get<Profissional[]>(

      `${this.api}/especialidade/${especialidadeId}`
    );
  }
}

