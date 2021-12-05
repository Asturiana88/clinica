import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacienteTurnosRoutingModule } from './paciente-turnos-routing.module';
import { PacienteTurnosComponent } from './paciente-turnos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'src/lib/shared/modal/modal.module';
import { EncuetaComponent } from './encueta/encueta.component';
import { CalificacionComponent } from './calificacion/calificacion.component';
import { PipesModule } from 'src/lib/pipes';
import { TurnoFiltrosModule } from 'src/lib/shared/turno-filtros/turno-filtros.module';

@NgModule({
  declarations: [
    PacienteTurnosComponent,
    EncuetaComponent,
    CalificacionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule,
    PipesModule,
    TurnoFiltrosModule,
    PacienteTurnosRoutingModule,
  ],
})
export class PacienteTurnosModule {}
