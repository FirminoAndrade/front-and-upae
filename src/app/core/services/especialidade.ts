import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Especialidade } from '../../shared/models/especialidade.model';
import { API_CONFIG } from '../config/api.config';
@Injectable({
  providedIn: 'root',
})
export class EspecialidadeService {

  private api = `${API_CONFIG.baseUrl}/especialidades`;

  constructor(private http: HttpClient) {}

 listar(): Observable<Especialidade[]> {

  return this.http.get<Especialidade[]>(this.api);
}

  salvar(nome: string): Observable<Especialidade> {

  return this.http.post<Especialidade>(this.api, {
    nome: nome
  });
}

  remover(id: number): Observable<any> {

  return this.http.delete(`${this.api}/${id}`);
}
}

