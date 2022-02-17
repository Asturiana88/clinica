import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminTurnosRoutingModule } from './admin-turnos-routing.module';
import { AdminTurnosComponent } from './admin-turnos.component';
import { ModalModule } from 'src/lib/shared/modal/modal.module';
import { PipesModule } from 'src/lib/pipes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TurnoFiltrosModule } from 'src/lib/shared/turno-filtros/turno-filtros.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [AdminTurnosComponent],
  imports: [
    CommonModule,
    ModalModule,
    ModalModule,
    FormsModule,
    ReactiveFormsModule,
    TurnoFiltrosModule,
    PipesModule,
    TranslateModule,
    AdminTurnosRoutingModule,
  ],
})
export class AdminTurnosModule {}
