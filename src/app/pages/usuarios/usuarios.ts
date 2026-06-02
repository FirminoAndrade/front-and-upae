import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Usuario } from '../../shared/models/usuario.model';
import { UsuarioService } from '../../core/services/usuario';
import { UsuarioDTO } from '../../shared/models/usuariodto.model';
import { AuthService } from '../../core/services/auth';



@Component({
  selector: 'app-usuarios',
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule
  ],
  templateUrl: './usuarios.html',
  styleUrls: ['./usuarios.css'],
})
export class Usuarios implements OnInit{

 idEdicao: number | null = null;

  nome = '';

  login = '';

  senha = '';

  perfil = 'RECEPCAO';

  ativo = true;

  dataSource = new MatTableDataSource<UsuarioDTO>();

  displayedColumns: string[] = [
    'id',
    'nome',
    'login',
    'perfil',
    'ativo',
    'acoes'
  ];

  constructor(
    private service: UsuarioService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {

    this.listar();
  }

  listar() {

    this.service.listar().subscribe({

      next: (res) => {

        this.dataSource.data = res.sort(
        (a: any, b: any) =>
          a.nome.localeCompare(b.nome)
      );
      }
    });
  }

  salvar() {

  const usuario: Usuario = {

    nome: this.nome,

    login: this.login,

    perfil: this.perfil,

    ativo: this.ativo
  };

  if (this.senha.trim() !== '') {

    usuario.senha = this.senha;
  }

  if (this.idEdicao) {

    this.service.atualizar(
      this.idEdicao,
      usuario
    ).subscribe({

      next: () => {

        this.authService.mensagem(

      'Usuário atualizado'
    );

        setTimeout(() => {

          this.cancelar();

          this.listar();

        });
      }
    });

    return;
  }

  this.service.salvar(usuario).subscribe({

    next: () => {

      this.authService.mensagem(

        'Usuário cadastrado'
      );

      setTimeout(() => {

        this.cancelar();

        this.listar();

      });
    }
  });
}

 editar(usuario: UsuarioDTO) {

  this.idEdicao = usuario.id ?? null;

  this.nome = usuario.nome;

  this.login = usuario.login;

  this.perfil = usuario.perfil;

  this.ativo = usuario.ativo;

  this.senha = '';
}

  remover(id: number) {

    if (!confirm('Deseja remover?')) {

      return;
    }

    this.service.remover(id).subscribe({

      next: () => {

        this.authService.mensagem(

          'Usuário removido'
        );

        this.listar();
      }
    });
  }

  cancelar() {

    this.idEdicao = null;

    this.nome = '';

    this.login = '';

    this.senha = '';

    this.perfil = 'RECEPCAO';

    this.ativo = true;
  }
}

