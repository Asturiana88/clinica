import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacientePerfilComponent } from './paciente-perfil.component';
import { PacientePerfilRoutingModule } from './paciente-perfil.routing';
import { PerfilModule } from 'src/lib/shared/perfil/perfil.module';

@NgModule({
  declarations: [PacientePerfilComponent],
  imports: [CommonModule, PerfilModule, PacientePerfilRoutingModule],
})
export class PacientePerfilModule {}
