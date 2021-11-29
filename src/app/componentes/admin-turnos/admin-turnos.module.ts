import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminTurnosRoutingModule } from './admin-turnos-routing.module';
import { AdminTurnosComponent } from './admin-turnos.component';


@NgModule({
  declarations: [
    AdminTurnosComponent
  ],
  imports: [
    CommonModule,
    AdminTurnosRoutingModule
  ]
})
export class AdminTurnosModule { }
