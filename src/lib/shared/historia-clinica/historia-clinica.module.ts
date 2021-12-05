import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoriaClinicaComponent } from './historia-clinica.component';
import { DirectivesModule } from 'src/lib/directivas';
import { PipesModule } from 'src/lib/pipes';

@NgModule({
  declarations: [HistoriaClinicaComponent],
  exports: [HistoriaClinicaComponent],
  imports: [CommonModule, DirectivesModule, PipesModule],
})
export class HistoriaClinicaModule {}
