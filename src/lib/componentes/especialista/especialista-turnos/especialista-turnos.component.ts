// tslint:disable-line: typedef
import { Component, OnInit } from '@angular/core';
import { Especialidad } from 'src/lib/clases/especialidad';
import { Filtro } from 'src/lib/clases/filtro';
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

  resena!: string;
  modal: { [key: string]: boolean } = {
    resena: false,
  };

  turnoSelected?: Turno;

  filtros: Filtro = {};

  handleOpenModal(turno: Turno, modal: string) {
    this.turnoSelected = turno;
    this.modal[modal] = true;
  }

  handleCloseModals() {
    this.updateData();
    this.turnoSelected = undefined;
    this.modal = {};
  }

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

  async updateData(filtros?: Filtro) {
    if (filtros) {
      this.filtros = filtros;
    }

    this.turnos = await this.storeService.GetTurnos({
      especialista: this.authService.getUser,
      ...this.filtros,
    });

    this.handlePacienteFiltro();
    this.closeModal();
  }

  turnoUpdateModal(
    estado: 'cancelado' | 'pendiente' | 'aceptado' | 'rechazado' | 'finalizado'
  ) {
    const turno = this.turnoSelected;
    if (!turno || !this.resena) {
      return;
    }
    this.storeService.UpdateTurno(turno.id || '', {
      ...turno,
      estado,
      resena: this.resena,
    });
    this.updateData();
    this.closeModal();
  }

  closeModal() {
    this.modal = {};
    this.resena = '';
    this.turnoSelected = undefined;
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
