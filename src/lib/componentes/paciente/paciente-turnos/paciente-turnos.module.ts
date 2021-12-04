import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacienteTurnosRoutingModule } from './paciente-turnos-routing.module';
import { PacienteTurnosComponent } from './paciente-turnos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'src/lib/shared/modal/modal.module';
import { EncuetaComponent } from './encueta/encueta.component';
import { CalificacionComponent } from './calificacion/calificacion.component';

@NgModule({
  declarations: [PacienteTurnosComponent, EncuetaComponent, CalificacionComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule,
    PacienteTurnosRoutingModule,
  ],
})
export class PacienteTurnosModule {}
