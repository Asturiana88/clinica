import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoriaClinicaComponent } from './historia-clinica.component';
import { DirectivesModule } from 'src/lib/directivas';
import { PipesModule } from 'src/lib/pipes';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [HistoriaClinicaComponent],
  exports: [HistoriaClinicaComponent],
  imports: [
    CommonModule,
    DirectivesModule,
    PipesModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class HistoriaClinicaModule {}
