import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstadoTurnoPipe } from './estado-turno.pipe';
import { SafeHtmlPipe } from './sanitizer.pipe';

@NgModule({
  declarations: [EstadoTurnoPipe, SafeHtmlPipe],
  exports: [EstadoTurnoPipe, SafeHtmlPipe],
  imports: [CommonModule],
})
export class PipesModule {}
