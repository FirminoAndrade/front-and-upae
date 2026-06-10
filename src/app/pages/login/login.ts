import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  standalone: true,

  imports: [CommonModule, FormsModule, RouterLink],

  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  login = '';

  senha = '';

  erroLogin = '';

  loading = false;

  constructor(
    private authService: AuthService,

    private router: Router,
  ) {}

  entrar() {
    this.erroLogin = '';

    if (!this.login || !this.senha) {
      this.authService.mensagem('Preencha todos os campos ⚠️');

      return;
    }

    this.loading = true;

    const dados = {
      login: this.login,

      senha: this.senha,
    };

    this.authService
      .login(dados)

      .pipe(
        finalize(() => {
          this.loading = false;
        }),
      )

      .subscribe({
        next: (res: any) => {
          const usuario = typeof res === 'string' ? JSON.parse(res) : res;

          localStorage.setItem(
            'usuario',

            JSON.stringify(usuario),
          );

          this.authService.mensagem('Login realizado com sucesso ✅');

          this.router.navigate(['/dashboard']);
        },

        error: (err) => {
          console.error(err);

          if (err.status === 401) {
            this.authService.mensagem('Login ou senha inválidos ❌');
          } else {
            this.authService.mensagem('Erro ao conectar com servidor');
          }
        },
      });
  }

  buttonAgedar() {
    localStorage.clear();

    this.router.navigate(['/agenda']);
  }
}
