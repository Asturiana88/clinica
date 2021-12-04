import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EspecialistaTurnosRoutingModule } from './especialista-turnos-routing.module';
import { EspecialistaTurnosComponent } from './especialista-turnos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'src/lib/shared/modal/modal.module';
import { PipesModule } from 'src/lib/pipes';

@NgModule({
  declarations: [EspecialistaTurnosComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule,
    PipesModule,
    EspecialistaTurnosRoutingModule,
  ],
})
export class EspecialistaTurnosModule {}