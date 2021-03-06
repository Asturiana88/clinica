import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/lib/clases/paciente';
import { Turno } from 'src/lib/clases/turno';
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

  pacientes: { paciente: Paciente; turnos: Turno[] }[] = [];

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

  async getPacientes(that?: any) {
    let thisInstance = this;
    if (that) {
      thisInstance = that;
    }
    const turnos = await thisInstance.store.GetTurnos({
      especialista: thisInstance.auth.getUser,
    });
    setTimeout(() => {
      if (turnos.length) {
        thisInstance.store.GetUsuarios().subscribe((users) => {
          users.forEach((user) => {
            if (
              user.rol === 'paciente' &&
              turnos.find((turno) => turno.paciente.uid === user.uid)
            ) {
              const pacienteTurnos = turnos.filter(
                (turno) => turno.paciente.uid === user.uid
              );
              thisInstance.pacientes.push({
                paciente: user as Paciente,
                turnos: pacienteTurnos,
              });
            }
          });
        });
      } else {
        setTimeout(() => {
          thisInstance.getPacientes(thisInstance);
        }, 600);
      }
    }, 300);
  }
}
