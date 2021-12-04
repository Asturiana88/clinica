import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacientePerfilComponent } from './paciente-perfil.component';

const routes: Routes = [
  {path: '', component: PacientePerfilComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacientePerfilRoutingModule { }
