import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EspecialidadeService } from '../../core/services/especialidade';
import { DiariaService } from '../../core/services/diaria';
import { RegistroDiario } from '../../shared/models/diaria.model';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { AuthService } from '../../core/services/auth';
import { ProfissionalService } from '../../core/services/profissional';
import { Profissional } from '../../shared/models/profissional';

@Component({
  selector: 'app-diarias',
  imports: [
      CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginator,
    MatPaginatorModule
  ],
  templateUrl: './diarias.html',
  styleUrl: './diarias.css',
})
export class Diarias implements OnInit{

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  filtroData = '';

  filtroEspecialidade = '';

  dadosOriginais: any[] = [];

  idEdicao: number | null = null;

  data = '';

  totalAgendados!: number;

  compareceram!: number;

  observacao = '';

  interno!:number;

  externo!: number;

  interconsulta!: number;

  especialidadeId!: number;

  especialidades: any[] = [];

  profissionais: Profissional[] = [];

  nomeProfissional = '';

 displayedColumns = [
  'data',
  'especialidade',
  'profissional',
  'agendados',
  'compareceram',
  'faltaram',
  'interno',
  'interconsulta',
  'externo',
  'acoes'
];

  dataSource =
    new MatTableDataSource<any>();

  constructor(
    private service: DiariaService,
    private serviceEspecialidade: EspecialidadeService,
    private authService: AuthService,
    private profissionalService: ProfissionalService,
  
  ) {}

  ngOnInit(): void {

    this.listar();
    this.carregarProfissionais();
    this.carregarEspecialidades();
  }

carregarEspecialidades() {
  this.serviceEspecialidade.listar().subscribe({
    next: (res) => {
      this.especialidades = res;
    }
  });
}

carregarProfissionais() {

  this.profissionalService
    .listar()
    .subscribe(res => {

      this.profissionais = res;
    });
}

 listar() {

  this.service.listar().subscribe({

    next: (res) => {

      this.dadosOriginais = res.reverse();

      this.dataSource.data = this.dadosOriginais;

      this.dataSource.paginator = this.paginator;
    }
  });
}

  salvar() {

     const totalAtendimentos =

    Number(this.interno || 0) +

    Number(this.interconsulta || 0) +

    Number(this.externo || 0);

  if (totalAtendimentos > this.compareceram) {

    this.authService.mensagem(

      'A soma de Interno, Interconsulta e Externo não pode ser maior que Compareceram ⚠️'
    );

    return;
  }

     if (this.interconsulta > this.interno) {

    this.authService.mensagem(

      'Interconsulta não pode ser maior que Interno'
    );

    return;
  }

    if (!this.nomeProfissional) {

  this.authService.mensagem(

    'Selecione o profissional ⚠️'

  );

  return;
}

  if ( (this.interno + this.externo) !== this.compareceram) {

    this.authService.mensagem(

      'A soma de Interno + Externo deve ser igual ao total de Compareceram ⚠️'

    );

    return;
  }

  if (this.compareceram < 0){

    this.authService.mensagem(

      'O campo Compareceram não pode ser negativo ⚠️'

    );
  }

  if (this.compareceram > this.totalAgendados) {

    this.authService.mensagem(

      'O campo Compareceram não pode ser maior que Total Agendados ⚠️'

    );

    return;
  }

  const diaria: RegistroDiario = {

    data: this.data,

    totalAgendados: this.totalAgendados,

    compareceram: this.compareceram,

    observacao: this.observacao,

    interno: this.interno,

    externo:this.externo,

    interconsulta: this.interconsulta,

    especialidadeId:this.especialidadeId,

    nomeProfissional: this.nomeProfissional
  };

  if (this.idEdicao) {

    this.service.atualizar(

      this.idEdicao,

      diaria

    ).subscribe({

      next: () => {

        this.authService.mensagem(

          'Atualizado com sucesso ✅'

        );

        this.cancelar();

        this.listar();
      }
    });

    return;
  }

  this.service.salvar(diaria)

    .subscribe({

      next: () => {

        this.authService.mensagem(

          'Salvo com sucesso ✅'

        );

        this.cancelar();

        this.listar();
      }
    });
}

 editar(item: any) {

  this.idEdicao = item.id ?? null;

  this.data = item.data;

  this.totalAgendados = item.totalAgendados;

  this.compareceram = item.compareceram;

  this.interno = item.interno;

  this.externo = item.externo;

  this.interconsulta = item.interconsulta;

  this.observacao = item.observacao;

  this.especialidadeId = item.especialidadeId;

  this.nomeProfissional = item.nomeProfissional;
}

  cancelar() {

  this.idEdicao = null;

  this.data = '';

  this.totalAgendados = null!;

  this.compareceram = null!;

  this.observacao = '';

  this.interno = null!;

  this.externo = null!;

  this.interconsulta = null!;

  this.especialidadeId = null!;

  this.nomeProfissional = '';
}

filtrar() {

  let dados =
    [...this.dadosOriginais];

  if (this.filtroData) {

    dados = dados.filter(

      (x: any) =>
        x.data === this.filtroData
    );
  }

  if (this.filtroEspecialidade) {

    dados = dados.filter(

      (x: any) =>
        x.especialidadeNome ===
        this.filtroEspecialidade
    );
  }

  this.dataSource.data = dados;
}
}
