import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/lib/clases/paciente';
import { AuthService } from 'src/lib/servicios/autenticacion.service';
import { StoreManagementService } from 'src/lib/servicios/store-management.service';

@Component({
  selector: 'app-pacientes-atendidos',
  templateUrl: './pacientes-atendidos.component.html',
  styleUrls: ['./pacientes-atendidos.component.scss'],
})
export class PacientesAtendidosComponent implements OnInit {
  constructor(
    private store: StoreManagementService,
    private auth: AuthService
  ) {}

  pacientes: Paciente[] = [];

  pacienteSeleccionado?: Paciente;
  modalOpen = false;

  openModal(paciente: Paciente) {
    this.pacienteSeleccionado = paciente;
    this.modalOpen = true;
  }

  closeModal() {
    this.pacienteSeleccionado = undefined;
    this.modalOpen = false;
  }

  ngOnInit(): void {
    this.getPacientes();
  }

  getPacientes(that?: any) {
    let thisInstance = this;
    if (that) {
      thisInstance = that;
    }
    const turnos = thisInstance.store.GetTurnos({
      especialista: thisInstance.auth.getUser,
    });
    setTimeout(() => {
      if (turnos.length) {
        thisInstance.store.GetUsuarios().subscribe((users) => {
          thisInstance.pacientes = users.filter(
            (user) =>
              user.rol === 'paciente' &&
              turnos.find((turno) => turno.paciente.uid === user.uid)
          ) as Paciente[];
        });
      } else {
        setTimeout(() => {
          thisInstance.getPacientes(thisInstance);
        }, 600);
      }
    }, 300);
  }
}
