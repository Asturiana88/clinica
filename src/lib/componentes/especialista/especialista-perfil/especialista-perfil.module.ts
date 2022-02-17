import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EspecialistaPerfilRoutingModule } from './especialista-perfil-routing.module';
import { EspecialistaPerfilComponent } from './especialista-perfil.component';
import { PerfilModule } from 'src/lib/shared/perfil/perfil.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [EspecialistaPerfilComponent],
  imports: [
    CommonModule,
    PerfilModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    EspecialistaPerfilRoutingModule,
  ],
})
export class EspecialistaPerfilModule {}
