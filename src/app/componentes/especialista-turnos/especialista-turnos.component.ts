import { Component, OnInit } from '@angular/core';
import { Especialidad } from 'src/app/clases/especialidad';
import { Turno } from 'src/app/clases/turno';
import { AuthService } from 'src/app/servicios/autenticacion.service';
import { StoreManagementService } from 'src/app/servicios/store-management.service';

@Component({
  selector: 'app-especialista-turnos',
  templateUrl: './especialista-turnos.component.html',
  styleUrls: ['./especialista-turnos.component.scss']
})
export class EspecialistaTurnosComponent implements OnInit {

  turnos!: Turno[]
  turnosFiltrados!: Turno[]
  pacienteFiltro!: string;
  especialidad!: Especialidad;
  especialidades =  this.storeService.GetEspecialidades()

  constructor(private storeService: StoreManagementService, private authService: AuthService) { }

  handlePacienteFiltro(){
    if (this.turnos && this.pacienteFiltro) {
      this.turnosFiltrados = this.turnos.filter(turno => {
          return turno.paciente.nombre.toLocaleLowerCase().includes(this.pacienteFiltro.toLocaleLowerCase())
      })
    } else {
      this.turnosFiltrados = this.turnos
    }
  }

  updateData(){
    this.turnos = this.storeService.GetTurnos(
      {especialista: this.authService.getUser, especialidad: this.especialidad})

    this.handlePacienteFiltro()
  }

  cancelarTurno(turno: Turno){
    this.storeService.UpdateTurno(turno.id || '', {...turno, estado:'cancelado'})
    this.updateData()
  }

  updateEstado(turno: Turno, estado:'pendiente' | 'aceptado' | 'rechazado' | 'cancelado' | 'finalizado'){
    this.storeService.UpdateTurno(turno.id || '', {...turno, estado})
    this.updateData()
  }


  ngOnInit(): void {
    this.updateData()
    this.turnosFiltrados = this.turnos
  }

}
