import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TurnoFiltrosComponent } from './turno-filtros.component';
import { DirectivesModule } from 'src/lib/directivas';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TurnoFiltrosComponent],
  exports: [TurnoFiltrosComponent],
  imports: [CommonModule, DirectivesModule, FormsModule, ReactiveFormsModule],
})
export class TurnoFiltrosModule {}
