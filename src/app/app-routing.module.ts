import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminService } from '../lib/canactivate/admin.service';
import { EspecialistaService } from '../lib/canactivate/especialista.service';
import { PacienteService } from '../lib/canactivate/paciente.service';
import { HomeComponent } from '../lib/shared/home/home.component';
import { AdminComponent } from '../lib/componentes/admin/register/admin.component';

const routes: Routes = [
  // Admin
  {
    path: 'register-admin',
    component: AdminComponent,
    canActivate: [AdminService],
    data: { animationState: '1' },
  },
  {
    path: 'admin-turnos',
    loadChildren: () =>
      import('../lib/componentes/admin/admin-turnos/admin-turnos.module').then(
        (m) => m.AdminTurnosModule
      ),
    canActivate: [AdminService],
    data: { animationState: '2' },
  },
  {
    path: 'user-list',
    loadChildren: () =>
      import(
        '../lib/componentes/admin/lista-usuarios/lista-usuarios.module'
      ).then((m) => m.ListaUsuariosModule),
    canActivate: [AdminService],
    data: { animationState: '3' },
  },

  // Especialista
  {
    path: 'especialista-turnos',
    loadChildren: () =>
      import(
        '../lib/componentes/especialista/especialista-turnos/especialista-turnos.module'
      ).then((m) => m.EspecialistaTurnosModule),
    canActivate: [EspecialistaService],
    data: { animationState: '4' },
  },
  {
    path: 'especialista-perfil',
    loadChildren: () =>
      import(
        '../lib/componentes/especialista/especialista-perfil/especialista-perfil.module'
      ).then((m) => m.EspecialistaPerfilModule),
    canActivate: [EspecialistaService],
    data: { animationState: '5' },
  },

  // Paciente
  {
    path: 'paciente-turnos',
    loadChildren: () =>
      import(
        '../lib/componentes/paciente/paciente-turnos/paciente-turnos.module'
      ).then((m) => m.PacienteTurnosModule),
    canActivate: [PacienteService],
    data: { animationState: '6' },
  },
  {
    path: 'paciente-perfil',
    loadChildren: () =>
      import(
        '../lib/componentes/paciente/paciente-perfil/paciente-perfil.module'
      ).then((m) => m.PacientePerfilModule),
    canActivate: [PacienteService],
    data: { animationState: '7' },
  },
  {
    path: 'solicitar-turno',
    loadChildren: () =>
      import('../lib/shared/solicitar-turno/solicitar-turno.module').then(
        (m) => m.SolicitarTurnoModule
      ),
    canActivate: [PacienteService],
    data: { animationState: '8' },
  },

  // All
  {
    path: 'login',
    loadChildren: () =>
      import('../lib/shared/login/login.module').then((m) => m.LoginModule),
    data: { animationState: '9' },
  },
  {
    path: 'register',
    loadChildren: () =>
      import('../lib/shared/registrarse/registrarse.module').then(
        (m) => m.RegistrarseModule
      ),
    data: { animationState: '10' },
  },
  { path: '', component: HomeComponent, data: { animationState: '11' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
