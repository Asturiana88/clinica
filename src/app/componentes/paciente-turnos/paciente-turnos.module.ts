import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacienteTurnosRoutingModule } from './paciente-turnos-routing.module';
import { PacienteTurnosComponent } from './paciente-turnos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PacienteTurnosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PacienteTurnosRoutingModule
  ]
})
export class PacienteTurnosModule { }
