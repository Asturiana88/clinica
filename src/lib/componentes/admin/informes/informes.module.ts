import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InformesRoutingModule } from './informes-routing.module';
import { InformesComponent } from './informes.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [InformesComponent],
  imports: [CommonModule, ChartsModule, InformesRoutingModule],
})
export class InformesModule {}
