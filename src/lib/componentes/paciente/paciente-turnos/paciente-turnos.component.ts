import { Component, OnInit } from '@angular/core';
import { Especialidad } from 'src/lib/clases/especialidad';
import { Especialista } from 'src/lib/clases/especialista';
import { Turno } from 'src/lib/clases/turno';
import { AuthService } from 'src/lib/servicios/autenticacion.service';
import { StoreManagementService } from 'src/lib/servicios/store-management.service';

@Component({
  selector: 'app-paciente-turnos',
  templateUrl: './paciente-turnos.component.html',
  styleUrls: ['./paciente-turnos.component.scss'],
})
export class PacienteTurnosComponent implements OnInit {
  especialidades = this.storeService.GetEspecialidades();

  especialistas: Especialista[] = [];
  especialista!: Especialista;

  especialidad!: Especialidad;

  turnos!: any[];

  modal: { [key: string]: boolean } = {
    resena: false,
  };

  turnoSelected?: Turno;

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

  updateData() {
    this.turnos = this.storeService.GetTurnos({
      paciente: this.authService.getUser,
      especialista: this.especialista,
      especialidad: this.especialidad,
    });
  }

  cancelarTurno(turno: Turno) {
    this.storeService.UpdateTurno(turno.id || '', {
      ...turno,
      estado: 'cancelado',
    });
    this.updateData();
  }

  ngOnInit(): void {
    this.updateData();
    this.storeService.GetUsuarios().subscribe((usrs) => {
      this.especialistas = usrs.filter(
        (usr) => usr.rol == 'especialista'
      ) as Especialista[];
    });
  }
}
