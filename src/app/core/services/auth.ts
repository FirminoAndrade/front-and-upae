import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from '../../shared/models/login.model';
import { API_CONFIG } from '../config/api.config';
import { MatSnackBar }
from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

    private api = `${API_CONFIG.baseUrl}/auth`;

  constructor(private http: HttpClient,  private _snack: MatSnackBar
) {

  }

  login(dados: LoginRequest): Observable<any> {

  return this.http.post(`${this.api}/login`, dados, {
    responseType: 'text'
  });
}

logout() {

  localStorage.clear();
}

mensagem(msg: string): void { 
  this._snack.open(msg, 'ok', { 
    horizontalPosition: 'center', 
    verticalPosition: 'bottom', 
    duration: 5000, 
  }); 
}
  
}
