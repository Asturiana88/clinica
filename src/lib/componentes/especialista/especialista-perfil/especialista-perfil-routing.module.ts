import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EspecialistaPerfilComponent } from './especialista-perfil.component';

const routes: Routes = [
  { path: '', component: EspecialistaPerfilComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EspecialistaPerfilRoutingModule { }
