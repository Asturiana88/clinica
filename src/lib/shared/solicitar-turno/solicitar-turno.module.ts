import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitarTurnoRoutingModule } from './solicitar-turno-routing.module';
import { SolicitarTurnoComponent } from './solicitar-turno.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SolicitarTurnoComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SolicitarTurnoRoutingModule,
  ],
})
export class SolicitarTurnoModule {}
