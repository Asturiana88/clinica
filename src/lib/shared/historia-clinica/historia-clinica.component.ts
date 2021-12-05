import { Component, Input, OnInit } from '@angular/core';
import { HistoriaClinica } from 'src/lib/clases/historia-clinica';
import { Paciente } from 'src/lib/clases/paciente';
import { Turno } from 'src/lib/clases/turno';
import { StoreManagementService } from 'src/lib/servicios/store-management.service';

@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.scss'],
})
export class HistoriaClinicaComponent implements OnInit {
  @Input() paciente!: Paciente;
  turnos!: Turno[];

  constructor(private store: StoreManagementService) {}

  ngOnInit(): void {}

  getTurnos() {
    this.turnos = this.store.GetTurnos({
      paciente: this.paciente,
      historia: true,
    });
  }

  getHistoria(turno: Turno) {
    if (turno.historiaClinica) {
      const keys = Object.keys(turno.historiaClinica);
      return keys.map((key) => ({
        dato: key,
        valor: (turno.historiaClinica as HistoriaClinica)[
          key as keyof HistoriaClinica
        ],
      }));
    }
    return [];
  }
}
