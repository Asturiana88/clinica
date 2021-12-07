import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Turno } from 'src/lib/clases/turno';
import { StoreManagementService } from 'src/lib/servicios/store-management.service';

@Component({
  selector: 'app-calificacion',
  templateUrl: './calificacion.component.html',
  styleUrls: ['./calificacion.component.scss'],
})
export class CalificacionComponent implements OnInit {
  @Input() turno!: Turno;
  @Output() callbackFunc = new EventEmitter<any>();

  constructor(private store: StoreManagementService) {}
  calificacion!: {
    comentario: string;
    puntuacionAtencion: number;
    solucionoSuProblema: boolean;
    mediosDeComunicacion: string[];
    probabilidadDeRecomendacion: number;
  };

  ngOnInit(): void {}

  submit() {
    if (!this.turno || !this.turno.id || !this.calificacion) {
      return;
    }
    this.store.UpdateTurno(this.turno.id, {
      ...this.turno,
      calificacion: this.calificacion,
    });
    this.callbackFunc.emit(true);
  }
}
