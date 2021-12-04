import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminTurnosComponent } from './admin-turnos.component';

const routes: Routes = [
  {path: '', component: AdminTurnosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminTurnosRoutingModule { }
