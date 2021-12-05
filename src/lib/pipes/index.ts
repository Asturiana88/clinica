import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstadoTurnoPipe } from './estado-turno.pipe';
import { SafeHtmlPipe } from './sanitizer.pipe';
import { CapitalizePipe } from './capitalize.pipe';
import { DynamicValueFormatPipe } from './format-dynamic-value.pipe';

@NgModule({
  declarations: [
    EstadoTurnoPipe,
    SafeHtmlPipe,
    CapitalizePipe,
    DynamicValueFormatPipe,
  ],
  exports: [
    EstadoTurnoPipe,
    SafeHtmlPipe,
    CapitalizePipe,
    DynamicValueFormatPipe,
  ],
  imports: [CommonModule],
})
export class PipesModule {}
