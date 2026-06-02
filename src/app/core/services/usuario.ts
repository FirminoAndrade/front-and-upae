import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Usuario } from '../../shared/models/usuario.model';
import { UsuarioDTO } from '../../shared/models/usuariodto.model';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

   private api = `${API_CONFIG.baseUrl}/usuarios`;

  constructor(private http: HttpClient) {}

 listar(): Observable<UsuarioDTO[]> {

    return this.http.get<Usuario[]>(this.api);
  }

  salvar(usuario: Usuario): Observable<Usuario> {

    return this.http.post<Usuario>(this.api, usuario);
  }

  atualizar(
    id: number,
    usuario: Usuario
  ): Observable<Usuario> {

    return this.http.put<Usuario>(
      `${this.api}/${id}`,
      usuario
    );
  }

  remover(id: number): Observable<void> {

    return this.http.delete<void>(
      `${this.api}/${id}`
    );
  }
}

