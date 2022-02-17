import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacientePerfilComponent } from './paciente-perfil.component';
import { PacientePerfilRoutingModule } from './paciente-perfil.routing';
import { PerfilModule } from 'src/lib/shared/perfil/perfil.module';
import { HistoriaClinicaModule } from 'src/lib/shared/historia-clinica/historia-clinica.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [PacientePerfilComponent],
  imports: [
    CommonModule,
    PerfilModule,
    PacientePerfilRoutingModule,
    TranslateModule,
    HistoriaClinicaModule,
  ],
})
export class PacientePerfilModule {}
