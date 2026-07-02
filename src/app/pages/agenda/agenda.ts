import { ChangeDetectorRef, Component, inject, OnInit, PLATFORM_ID } from '@angular/core';

import { CommonModule, isPlatformBrowser } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { CalendarModule, CalendarEvent, CalendarMonthViewDay, DateAdapter } from 'angular-calendar';

import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { provideCalendar } from 'angular-calendar';
import { AgendaService } from '../../core/services/agendaservice';
import { EspecialidadeService } from '../../core/services/especialidade';
import { ProfissionalService } from '../../core/services/profissional';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-agenda',

  standalone: true,

  imports: [CommonModule, FormsModule, CalendarModule],

  providers: [
    provideCalendar({
      provide: DateAdapter,

      useFactory: adapterFactory,
    }),
  ],

  templateUrl: './agenda.html',

  styleUrls: ['./agenda.css'],
})
export class AgendaComponent implements OnInit {
  platformId = inject(PLATFORM_ID);

  usuario: any;

  locale: string = 'pt';

  viewDate: Date = new Date();

  events: CalendarEvent[] = [];

  agendasDia: any[] = [];

  especialidades: any[] = [];

  profissionais: any[] = [];

  idEdicao: number | null = null;

  data = '';

  turno = '';

  dataSelecionada = '';

  especialidade = '';

  profissional = '';

  agendados!: number;

  confirmado = false;

  agendas: any[] = [];

  constructor(
    private service: AgendaService,
    private cd: ChangeDetectorRef,
    private authService: AuthService,
    private especialidadeService: EspecialidadeService,

    private profissionalService: ProfissionalService,
  ) {
    this.carregarEventos();
  }

  ngOnInit(): void {
    this.usuario = this.authService.usuario;

    this.carregarEspecialidades();

    this.carregarProfissionais();

    this.listar();
  }

  isAdmin(): boolean {
    return this.usuario?.perfil === 'ADMIN';
  }

  isAuxiliarAdmin(): boolean {
    return this.usuario?.perfil === 'AUXILIAR_ADMIN';
  }

  podeEditarAgenda(): boolean {
    return this.isAdmin() || this.isAuxiliarAdmin();
  }

  carregarEspecialidades() {
    this.especialidadeService
      .listar()

      .subscribe({
        next: (res) => {
          this.especialidades = res;
        },
      });
  }

  carregarProfissionais() {
    this.profissionalService
      .listar()

      .subscribe({
        next: (res) => {
          this.profissionais = res;
        },
      });
  }

  listar() {
    this.service.listar().subscribe({
      next: (res) => {
        this.agendas = res;

        this.carregarEventos();

        this.cd.detectChanges();

        this.carregarAgendaDia();
      },
    });
  }

  mesAnterior() {
    this.viewDate = new Date(
      this.viewDate.getFullYear(),

      this.viewDate.getMonth() - 1,

      1,
    );
  }

  proximoMes() {
    this.viewDate = new Date(
      this.viewDate.getFullYear(),

      this.viewDate.getMonth() + 1,

      1,
    );
  }

  hoje() {
    this.viewDate = new Date();
  }

  imprimirAgenda() {
    window.print();
  }

  carregarEventos() {
    this.events = this.agendas.map((item) => ({
      start: new Date(item.data + 'T00:00:00'),

      title: '',

      color: {
        primary: item.confirmado ? '#198754' : '#dc3545',

        secondary: '#f8f9fa',
      },
    }));
  }

  salvar() {
    const agenda = {
      data: this.data,

      especialidade: this.especialidade.toUpperCase(),

      profissional: this.profissional.toUpperCase(),

      agendados: this.agendados,

      turno: this.turno,

      confirmado: this.confirmado,
    };

    if (this.idEdicao) {
      this.service.atualizar(this.idEdicao, agenda).subscribe({
        next: () => {
          this.listar();

          this.cancelar();
        },
      });

      return;
    }

    this.service.salvar(agenda).subscribe({
      next: () => {
        this.listar();

        this.cancelar();
      },
    });
  }

  editar(item: any) {
    this.idEdicao = item.id;

    this.data = item.data;

    this.especialidade = item.especialidade;

    this.profissional = item.profissional;

    this.turno = item.turno;

    this.agendados = item.agendados;

    this.confirmado = item.confirmado;
  }

  remover(id: number) {
    if (!confirm('Deseja realmente remover esta agenda?')) {
      return;
    }

    this.service.remover(id).subscribe({
      next: () => {
        this.listar();

        this.cancelar();
      },
    });
  }

  cancelar() {
    this.idEdicao = null;

    this.data = '';

    this.especialidade = '';

    this.profissional = '';

    this.turno = '';

    this.agendados = 0;

    this.confirmado = false;
  }

  dayClicked(day: CalendarMonthViewDay) {
    this.dataSelecionada = day.date.toISOString().split('T')[0];

    this.carregarAgendaDia();
  }

  carregarAgendaDia() {
    this.agendasDia = this.agendas.filter((x) => x.data === this.dataSelecionada);
  }

  get agendasAgrupadas() {
    const mesAtual = this.viewDate.getMonth();

    const anoAtual = this.viewDate.getFullYear();

    const grupos: any = {};

    this.agendas

      .filter((item) => {
        const data = new Date(item.data + 'T00:00:00');

        return data.getMonth() === mesAtual && data.getFullYear() === anoAtual;
      })

      .sort(
        (a, b) =>
          new Date(a.data + 'T00:00:00').getTime() - new Date(b.data + 'T00:00:00').getTime(),
      )

      .forEach((item) => {
        if (!grupos[item.data]) {
          grupos[item.data] = [];
        }

        grupos[item.data].push(item);

        grupos[item.data].sort((a: any, b: any) => {
          if (a.turno === b.turno) {
            return a.profissional.localeCompare(b.profissional);
          }

          return a.turno === 'MANHA' ? -1 : 1;
        });
      });

    return Object.keys(grupos).map((data) => ({
      data,

      itens: grupos[data],
    }));
  }
}
