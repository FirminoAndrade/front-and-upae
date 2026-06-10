import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EspecialidadeService } from '../../core/services/especialidade';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { ProfissionalService } from '../../core/services/profissional';
import { AuthService } from '../../core/services/auth';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-especialidades',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule, MatPaginatorModule],
  templateUrl: './especialidades.html',
  styleUrls: ['./especialidades.css'],
})
export class Especialidades implements OnInit, AfterViewInit {
  @ViewChild('paginatorEspecialidades')
  paginatorEspecialidades!: MatPaginator;

  @ViewChild('paginatorProfissionais')
  paginatorProfissionais!: MatPaginator;

  nome = '';

  nomeProfissional = '';

  dataSource = new MatTableDataSource<any>();

  displayedColumns: string[] = ['id', 'nome'];

  dataSourceProfissionais = new MatTableDataSource<any>();

  displayedColumnsProfissionais = ['id', 'nome', 'acoes'];

  constructor(
    private service: EspecialidadeService,

    private profissionalService: ProfissionalService,

    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.listar();

    this.listarProfissionais();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginatorEspecialidades;

    this.dataSourceProfissionais.paginator = this.paginatorProfissionais;
  }

  aplicarFiltroEspecialidades(event: Event): void {
    const valor = (event.target as HTMLInputElement).value.trim().toLowerCase();

    this.dataSource.filter = valor;
  }

  aplicarFiltroProfissionais(event: Event): void {
    const valor = (event.target as HTMLInputElement).value.trim().toLowerCase();

    this.dataSourceProfissionais.filter = valor;
  }

  listar(): void {
    this.service.listar().subscribe({
      next: (res) => {
        this.dataSource.data = res.sort((a: any, b: any) => a.nome.localeCompare(b.nome));
      },
    });
  }

  salvar(): void {
    if (!this.nome.trim()) {
      return;
    }

    this.service
      .salvar(this.nome.toUpperCase())

      .subscribe({
        next: () => {
          this.authService.mensagem('Especialidade salva ✅');
          setTimeout(() => {
            this.nome = '';

            this.listar();
          });
        },
      });
  }

  listarProfissionais(): void {
    this.profissionalService
      .listar()

      .subscribe({
        next: (res) => {
          this.dataSourceProfissionais.data = res.sort((a: any, b: any) =>
            a.nome.localeCompare(b.nome),
          );
        },
      });
  }

  salvarProfissional(): void {
    if (!this.nomeProfissional.trim()) {
      return;
    }

    const profissional = {
      nome: this.nomeProfissional.toUpperCase(),
    };

    this.profissionalService
      .salvar(profissional)

      .subscribe({
        next: () => {
          this.authService.mensagem('Profissional salvo ✅');

          setTimeout(() => {
            this.nomeProfissional = '';

            this.listarProfissionais();
          });
        },
      });
  }

  removerProfissional(id: number): void {
    if (!confirm('Deseja remover o profissional?')) {
      return;
    }

    this.profissionalService
      .remover(id)

      .subscribe({
        next: () => {
          this.authService.mensagem('Profissional removido ✅');

          this.listarProfissionais();
        },
      });
  }

  trackById(index: number, item: any): number {
    return item.id;
  }
}
