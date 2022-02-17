import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoriaClinicaComponent } from './historia-clinica.component';
import { DirectivesModule } from 'src/lib/directivas';
import { PipesModule } from 'src/lib/pipes';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [HistoriaClinicaComponent],
  exports: [HistoriaClinicaComponent],
  imports: [CommonModule, DirectivesModule, PipesModule, TranslateModule],
})
export class HistoriaClinicaModule {}
