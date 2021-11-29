import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EspecialistaTurnosComponent } from './especialista-turnos.component';

const routes: Routes = [{
  path: '', component: EspecialistaTurnosComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EspecialistaTurnosRoutingModule { }
