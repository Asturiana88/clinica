import { Pipe, PipeTransform } from '@angular/core';

// Le da formato a los estados de los turnos
@Pipe({
  name: 'estadoTurno',
})
export class EstadoTurnoPipe implements PipeTransform {
  estados = ['pendiente', 'aceptado', 'rechazado', 'cancelado', 'finalizado'];
  colores = ['#fc6603', '#03a31b', '#ee54ff', '#ff3b3b', '#ffffff'];
  transform(
    value: 'pendiente' | 'aceptado' | 'rechazado' | 'cancelado' | 'finalizado',
    ...args: unknown[]
  ): string {
    return `<span style="text-transform: capitalize; color: ${
      this.colores[this.estados.indexOf(value)]
    }">${value}</span>`;
  }
}
