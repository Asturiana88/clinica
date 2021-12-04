import { Component, OnInit } from '@angular/core';
import { Especialidad } from 'src/lib/clases/especialidad';
import { Turno } from 'src/lib/clases/turno';
import { AuthService } from 'src/lib/servicios/autenticacion.service';
import { StoreManagementService } from 'src/lib/servicios/store-management.service';

@Component({
  selector: 'app-especialista-turnos',
  templateUrl: './especialista-turnos.component.html',
  styleUrls: ['./especialista-turnos.component.scss'],
})
export class EspecialistaTurnosComponent implements OnInit {
  turnos!: Turno[];
  turnosFiltrados!: Turno[];
  pacienteFiltro!: string;
  especialidad!: Especialidad;
  especialidades = this.storeService.GetEspecialidades();

  constructor(
    private storeService: StoreManagementService,
    private authService: AuthService
  ) {}

  handlePacienteFiltro() {
    if (this.turnos && this.pacienteFiltro) {
      this.turnosFiltrados = this.turnos.filter((turno) => {
        return turno.paciente.nombre
          .toLocaleLowerCase()
          .includes(this.pacienteFiltro.toLocaleLowerCase());
      });
    } else {
      this.turnosFiltrados = this.turnos;
    }
  }

  updateData() {
    this.turnos = this.storeService.GetTurnos({
      especialista: this.authService.getUser,
      especialidad: this.especialidad,
    });

    this.handlePacienteFiltro();
  }

  cancelarTurno(turno: Turno) {
    this.storeService.UpdateTurno(turno.id || '', {
      ...turno,
      estado: 'cancelado',
    });
    this.updateData();
  }

  modalOpen = false;
  modalOpenView = false;
  resena = '';
  turnoSeleccionado?: Turno;

  turnoUpdatePopup(turno: Turno) {
    this.modalOpen = true;
    this.resena = '';
    this.turnoSeleccionado = turno;
  }

  turnoUpdatePopupConfirm() {
    const turno = this.turnoSeleccionado;
    if (!turno) return;
    this.storeService.UpdateTurno(turno.id || '', {
      ...turno,
      estado: 'rechazado',
      resena: this.resena,
    });
    this.updateData();
    this.closeModal();
  }

  closeModal() {
    this.modalOpen = false;
    this.modalOpenView = false;
    this.turnoSeleccionado = undefined;
  }

  verComentario(turno: Turno) {
    this.modalOpenView = true;
    this.turnoSeleccionado = turno;
  }

  updateEstado(
    turno: Turno,
    estado: 'pendiente' | 'aceptado' | 'rechazado' | 'cancelado' | 'finalizado'
  ) {
    this.storeService.UpdateTurno(turno.id || '', { ...turno, estado });
    this.updateData();
  }

  ngOnInit(): void {
    this.updateData();
    this.turnosFiltrados = this.turnos;
  }
}
