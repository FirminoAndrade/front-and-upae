import { Injectable } from '@angular/core';
import { ListaEspera } from '../../shared/models/lista-espera';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root',
})
export class ListaEsperaService {

    private api = `${API_CONFIG.baseUrl}/lista-espera`;

  constructor(
    private http: HttpClient
  ) {}

  listar(): Observable<ListaEspera[]> {

    return this.http.get<ListaEspera[]>(
      this.api
    );
  }

  buscarPorId(id: number) {

    return this.http.get<ListaEspera>(
      `${this.api}/${id}`
    );
  }

  salvar(
    item: ListaEspera
  ): Observable<ListaEspera> {

    return this.http.post<ListaEspera>(
      this.api,
      item
    );
  }

  atualizar(
    id: number,
    item: ListaEspera
  ): Observable<ListaEspera> {

    return this.http.put<ListaEspera>(
      `${this.api}/${id}`,
      item
    );
  }

  remover(id: number) {

    return this.http.delete(
      `${this.api}/${id}`
    );
  }
}
