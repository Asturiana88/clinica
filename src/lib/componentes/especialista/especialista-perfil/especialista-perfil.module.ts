import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EspecialistaPerfilRoutingModule } from './especialista-perfil-routing.module';
import { EspecialistaPerfilComponent } from './especialista-perfil.component';
import { PerfilModule } from 'src/lib/shared/perfil/perfil.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [EspecialistaPerfilComponent],
  imports: [
    CommonModule,
    PerfilModule,
    FormsModule,
    ReactiveFormsModule,
    EspecialistaPerfilRoutingModule,
  ],
})
export class EspecialistaPerfilModule {}
