import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AuthService } from '../../core/services/auth';
import { EspecialidadeService } from '../../core/services/especialidade';
import { ListaEsperaService } from '../../core/services/lista-espera-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-lista-espera-component',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    NgxMaskDirective
  ],
  templateUrl: './lista-espera-component.html',
  styleUrl: './lista-espera-component.css',
})
export class ListaEsperaComponent {
  
   @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  idEdicao: number | null = null;

  nome = '';

  prontuario = '';

  telefone = '';

  dataNascimento = '';

  especialidade = '';

  confirmado = false;

  filtroNome = '';

  filtroEspecialidade = '';

  especialidades: any[] = [];

  dadosOriginais: any[] = [];

  displayedColumns = [

    'prontuario',

    'nome',

    'telefone',

    'dataNascimento',

    'especialidade',

    'confirmado',

    'acoes'
  ];

  dataSource =
    new MatTableDataSource<any>();

  constructor(

    private service:
      ListaEsperaService,

    private authService:
      AuthService,

    private especialidadeService:
      EspecialidadeService
  ) {}

  ngOnInit(): void {

    this.listar();

    this.carregarEspecialidades();
  }

  carregarEspecialidades() {

    this.especialidadeService
      .listar()
      .subscribe(res => {

        this.especialidades = res;
      });
  }

  listar() {

    this.service.listar()
      .subscribe({

        next: (res) => {

          this.dadosOriginais = res;

          this.dataSource.data =
            this.ordenarLista(res);

          this.dataSource.paginator =
            this.paginator;
        }
      });
  }

  ordenarLista(lista: any[]) {

    return lista.sort((a, b) => {

      if (
        a.confirmado !== b.confirmado
      ) {

        return a.confirmado ? 1 : -1;
      }

      return new Date(a.createdAt)
        .getTime()

        -

      new Date(b.createdAt)
        .getTime();
    });
  }

  salvar() {

    const item = {

      nome: this.nome,

      prontuario: this.prontuario,

      telefone: this.telefone,

      dataNascimento:
        this.dataNascimento,

      especialidade:
        this.especialidade,

      confirmado:
        this.confirmado
    };

    if (this.idEdicao) {

      this.service.atualizar(

        this.idEdicao,

        item

      ).subscribe({

        next: () => {

          this.authService
            .mensagem(

              'Atualizado com sucesso ✅'
            );

          this.cancelar();

          this.listar();
        }
      });

      return;
    }

    this.service.salvar(item)
      .subscribe({

        next: () => {

          this.authService
            .mensagem(

              'Salvo com sucesso ✅'
            );

          this.cancelar();

          this.listar();
        }
      });
  }

  editar(item: any) {

    this.idEdicao = item.id;

    this.nome = item.nome;

    this.prontuario =
      item.prontuario;

    this.telefone =
      item.telefone;

    this.dataNascimento =
      item.dataNascimento;

    this.especialidade =
      item.especialidade;

    this.confirmado =
      item.confirmado;
  }

  remover(id: number) {

    if (!confirm(
      'Deseja remover?'
    )) {

      return;
    }

    this.service.remover(id)
      .subscribe({

        next: () => {

          this.listar();
        }
      });
  }

  cancelar() {

    this.idEdicao = null;

    this.nome = '';

    this.prontuario = '';

    this.telefone = '';

    this.dataNascimento = '';

    this.especialidade = '';

    this.confirmado = false;
  }

  filtrar() {

    let dados = [

      ...this.dadosOriginais
    ];

    if (this.filtroNome) {

      dados = dados.filter(

        x =>

          x.nome
            .toLowerCase()
            .includes(

              this.filtroNome
                .toLowerCase()

            )

          ||

          x.prontuario
            .includes(

              this.filtroNome
            )
      );
    }

    if (
      this.filtroEspecialidade
    ) {

      dados = dados.filter(

        x =>

          x.especialidade ===
          this.filtroEspecialidade
      );
    }

    this.dataSource.data =
      this.ordenarLista(dados);
  }
}
