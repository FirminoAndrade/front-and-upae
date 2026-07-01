import { CommonModule } from '@angular/common';

import { Component, OnInit, ChangeDetectorRef, inject, PLATFORM_ID } from '@angular/core';

import { RouterModule } from '@angular/router';

import { DashboardService } from '../../core/services/dashboard';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-dashboard',

  standalone: true,

  imports: [CommonModule, RouterModule],

  templateUrl: './dashboard.html',

  styleUrls: ['./dashboard.css'],
})
export class Dashboard implements OnInit {
  platformId = inject(PLATFORM_ID);

  usuario: any;

  dataAtual = new Date();

  mostrarSobre = false;

  totalDiarias = 0;
  totalEspecialidades = 0;
  totalUsuarios = 0;
  totalListaEspera = 0;
  totalConfirmadosLista = 0;

  constructor(
    private service: DashboardService,
    private cd: ChangeDetectorRef,
    public authService: AuthService,
  ) {}

  ngOnInit(): void {

  this.usuario = this.authService.usuario;

  this.carregarTotais();
}

  isAdmin(): boolean {
  return this.authService.usuario?.perfil === 'ADMIN';
}

isRecepcao(): boolean {
  return this.authService.usuario?.perfil === 'RECEPCAO';
}

isAuxiliarAdmin(): boolean {
  return this.authService.usuario?.perfil === 'AUXILIAR_ADMIN';
}

  carregarTotais() {
    this.service.buscarTotais().subscribe({
      next: (res: any) => {
        this.totalDiarias = Number(res.totalDiarias);
        this.totalEspecialidades = Number(res.totalEspecialidades);
        this.totalUsuarios = Number(res.totalUsuarios);
        this.totalListaEspera = Number(res.totalListaEspera);
        this.totalConfirmadosLista = Number(res.totalConfirmadosLista);

        this.cd.detectChanges();
      },
    });
  }

  logout() {
    this.authService.usuario = null;
    localStorage.clear();
  }
}
