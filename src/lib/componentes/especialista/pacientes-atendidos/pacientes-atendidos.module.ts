import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacientesAtendidosRoutingModule } from './pacientes-atendidos-routing.module';
import { PacientesAtendidosComponent } from './pacientes-atendidos.component';
import { HistoriaClinicaModule } from 'src/lib/shared/historia-clinica/historia-clinica.module';
import { ModalModule } from 'src/lib/shared/modal/modal.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [PacientesAtendidosComponent],
  imports: [
    CommonModule,
    HistoriaClinicaModule,
    ModalModule,
    TranslateModule,
    PacientesAtendidosRoutingModule,
  ],
})
export class PacientesAtendidosModule {}
