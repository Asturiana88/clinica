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
    data: { animationState: 'RegistrarAdmin' },
  },
  {
    path: 'admin-turnos',
    loadChildren: () =>
      import('../lib/componentes/admin/admin-turnos/admin-turnos.module').then(
        (m) => m.AdminTurnosModule
      ),
    canActivate: [AdminService],
    data: { animationState: 'TrunosAdmin' },
  },
  {
    path: 'user-list',
    loadChildren: () =>
      import(
        '../lib/componentes/admin/lista-usuarios/lista-usuarios.module'
      ).then((m) => m.ListaUsuariosModule),
    canActivate: [AdminService],
    data: { animationState: 'AdminUserList' },
  },
  {
    path: 'informes',
    loadChildren: () =>
      import('../lib/componentes/admin/informes/informes.module').then(
        (m) => m.InformesModule
      ),
    canActivate: [AdminService],
    data: { animationState: 'Informes' },
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('../lib/componentes/admin/settings/settings.module').then(
        (m) => m.SettingsModule
      ),
    canActivate: [AdminService],
    data: { animationState: 'Settings' },
  },

  // Especialista
  {
    path: 'especialista-turnos',
    loadChildren: () =>
      import(
        '../lib/componentes/especialista/especialista-turnos/especialista-turnos.module'
      ).then((m) => m.EspecialistaTurnosModule),
    canActivate: [EspecialistaService],
    data: { animationState: 'TrunosEspecialista' },
  },
  {
    path: 'pacientes-atendidos',
    loadChildren: () =>
      import(
        '../lib/componentes/especialista/pacientes-atendidos/pacientes-atendidos.module'
      ).then((m) => m.PacientesAtendidosModule),
    canActivate: [EspecialistaService],
    data: { animationState: 'EspecialistaPacientesAtendidos' },
  },
  {
    path: 'especialista-perfil',
    loadChildren: () =>
      import(
        '../lib/componentes/especialista/especialista-perfil/especialista-perfil.module'
      ).then((m) => m.EspecialistaPerfilModule),
    canActivate: [EspecialistaService],
    data: { animationState: 'EspecialistaPerfil' },
  },

  // Paciente
  {
    path: 'paciente-turnos',
    loadChildren: () =>
      import(
        '../lib/componentes/paciente/paciente-turnos/paciente-turnos.module'
      ).then((m) => m.PacienteTurnosModule),
    canActivate: [PacienteService],
    data: { animationState: 'TurnosPaciente' },
  },
  {
    path: 'paciente-perfil',
    loadChildren: () =>
      import(
        '../lib/componentes/paciente/paciente-perfil/paciente-perfil.module'
      ).then((m) => m.PacientePerfilModule),
    canActivate: [PacienteService],
    data: { animationState: 'PacientePerfil' },
  },
  {
    path: 'solicitar-turno',
    loadChildren: () =>
      import('../lib/shared/solicitar-turno/solicitar-turno.module').then(
        (m) => m.SolicitarTurnoModule
      ),
    canActivate: [PacienteService],
    data: { animationState: 'SolicitarTurno' },
  },

  // All
  {
    path: 'login',
    loadChildren: () =>
      import('../lib/shared/login/login.module').then((m) => m.LoginModule),
    data: { animationState: 'Login' },
  },
  {
    path: 'register',
    loadChildren: () =>
      import('../lib/shared/registrarse/registrarse.module').then(
        (m) => m.RegistrarseModule
      ),
    data: { animationState: 'Registrarse' },
  },
  { path: '', component: HomeComponent, data: { animationState: 'Home' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
