import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacienteTurnosComponent } from './paciente-turnos.component';

const routes: Routes = [
  {path: '', component: PacienteTurnosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacienteTurnosRoutingModule { }
