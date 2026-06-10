import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RelatorioService } from '../../core/services/relatorio';

@Component({
  selector: 'app-relatorio',
  imports: [CommonModule, FormsModule],
  templateUrl: './relatorio.html',
  styleUrl: './relatorio.css',
})
export class Relatorio {
  dataInicio = '';

  dataFim = '';

  relatorios: any[] = [];

  filtroEspecialidade = '';

  filtroProfissional = '';

  relatoriosOriginais: any[] = [];

  constructor(private service: RelatorioService) {}

  buscarRelatorio() {
    this.service
      .buscarPorPeriodo(
        this.dataInicio,

        this.dataFim,
      )
      .subscribe({
        next: (res) => {
          this.relatoriosOriginais = res;

          this.relatorios = res;
        },
      });
  }

  getTotalAgendados(): number {
    return this.relatorios.reduce(
      (total, item) => total + item.totalAgendados,

      0,
    );
  }

  getTotalCompareceram(): number {
    return this.relatorios.reduce(
      (total, item) => total + item.compareceram,

      0,
    );
  }

  getTotalFaltaram(): number {
    return this.relatorios.reduce(
      (total, item) => total + item.faltaram,

      0,
    );
  }

  getTotalInterno(): number {
    return this.relatorios.reduce(
      (total, item) => total + item.interno,

      0,
    );
  }

  getTotalInterconsulta(): number {
    return this.relatorios.reduce(
      (total, item) => total + (item.interconsulta || 0),

      0,
    );
  }

  getTotalExterno(): number {
    return this.relatorios.reduce(
      (total, item) => total + item.externo,

      0,
    );
  }

  imprimir() {
    window.print();
  }

  filtrar(): void {
    let dados = [...this.relatoriosOriginais];

    if (this.filtroEspecialidade.trim()) {
      dados = dados.filter((item) =>
        item.especialidade?.toLowerCase().includes(this.filtroEspecialidade.toLowerCase()),
      );
    }

    if (this.filtroProfissional.trim()) {
      dados = dados.filter((item) =>
        item.profissional?.toLowerCase().includes(this.filtroProfissional.toLowerCase()),
      );
    }

    this.relatorios = dados;
  }
}
