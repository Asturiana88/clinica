import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InformesRoutingModule } from './informes-routing.module';
import { InformesComponent } from './informes.component';
import { ChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [InformesComponent],
  imports: [
    CommonModule,
    ChartsModule,
    InformesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
})
export class InformesModule {}
