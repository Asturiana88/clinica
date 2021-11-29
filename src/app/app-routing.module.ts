import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminService } from './canactivate/admin.service';
import { EspecialistaService } from './canactivate/especialista.service';
import { PacienteService } from './canactivate/paciente.service';
import { HomeComponent } from './componentes/home/home.component';
import { AdminComponent } from './componentes/registrarse/admin/admin.component';

const routes: Routes = [
  {path:'register-admin' , component:AdminComponent, canActivate:[AdminService]},
  {path:'login' , loadChildren: () => import('./componentes/login/login.module').then(m => m.LoginModule)},
  {path:'register' , loadChildren: () => import('./componentes/registrarse/registrarse.module').then(m => m.RegistrarseModule)},
  {path:'user-list' , loadChildren: () => import('./componentes/lista-usuarios/lista-usuarios.module').then(m => m.ListaUsuariosModule), canActivate:[AdminService]},
  {path:'especialista-turnos' , loadChildren: () => import('./componentes/especialista-turnos/especialista-turnos.module').then(m => m.EspecialistaTurnosModule), canActivate:[EspecialistaService]},
  {path:'paciente-turnos' , loadChildren: () => import('./componentes/paciente-turnos/paciente-turnos.module').then(m => m.PacienteTurnosModule), canActivate:[PacienteService]},
  {path:'admin-turnos' , loadChildren: () => import('./componentes/admin-turnos/admin-turnos.module').then(m => m.AdminTurnosModule), canActivate:[AdminService]},

  {path:'solicitar-turno' , loadChildren: () => import('./componentes/solicitar-turno/solicitar-turno.module').then(m => m.SolicitarTurnoModule), canActivate:[PacienteService]},
  {path:'' , component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
