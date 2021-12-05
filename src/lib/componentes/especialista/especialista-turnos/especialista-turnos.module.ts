import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EspecialistaTurnosRoutingModule } from './especialista-turnos-routing.module';
import { EspecialistaTurnosComponent } from './especialista-turnos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'src/lib/shared/modal/modal.module';
import { PipesModule } from 'src/lib/pipes';
import { HistoriaClinicaFormComponent } from './historia-clinica-form/historia-clinica-form.component';
import { DirectivesModule } from 'src/lib/directivas';
import { RecaptchaModule } from 'ng-recaptcha';
import { TurnoFiltrosModule } from 'src/lib/shared/turno-filtros/turno-filtros.module';

@NgModule({
  declarations: [EspecialistaTurnosComponent, HistoriaClinicaFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule,
    PipesModule,
    DirectivesModule,
    TurnoFiltrosModule,
    RecaptchaModule,
    EspecialistaTurnosRoutingModule,
  ],
})
export class EspecialistaTurnosModule {}
