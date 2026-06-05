import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { Especialidades } from './pages/especialidades/especialidades';
import { Usuarios } from './pages/usuarios/usuarios';
import { Diarias } from './pages/diarias/diarias';
import { Relatorio } from './pages/relatorio/relatorio';
import { authGuard } from './core/guards/auth-guard';
import { AgendaComponent } from './pages/agenda/agenda';

export const routes: Routes = [

  {
    path: '',
    component: Login
  },

  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard]
  },

  {
    path: 'especialidades',
    component: Especialidades,
    canActivate: [authGuard]
  },

  {
    path: 'usuarios',
    component: Usuarios,
    canActivate: [authGuard]
  },

  {
    path: 'diarias',
    component: Diarias,
    canActivate: [authGuard]
  },

  {
    path: 'relatorios',
    component: Relatorio,
    canActivate: [authGuard]
  },
  {
    path: 'agenda',
    component: AgendaComponent
  },
  { 
    path: '**',
    redirectTo: ''
  }

];
