import { Component, OnInit } from '@angular/core';
import { Especialidad } from 'src/app/clases/especialidad';
import { Especialista } from 'src/app/clases/especialista';
import { Turno } from 'src/app/clases/turno';
import { AuthService } from 'src/app/servicios/autenticacion.service';
import { StoreManagementService } from 'src/app/servicios/store-management.service';

@Component({
  selector: 'app-paciente-turnos',
  templateUrl: './paciente-turnos.component.html',
  styleUrls: ['./paciente-turnos.component.scss']
})
export class PacienteTurnosComponent implements OnInit {

  especialidades =  this.storeService.GetEspecialidades()

  especialistas:Especialista[] = []
  especialista!:Especialista

  especialidad!:Especialidad

  turnos!: any[]

  constructor(private storeService: StoreManagementService, private authService: AuthService) { }

  updateData(){
    this.turnos = this.storeService.GetTurnos(
      {paciente: this.authService.getUser, especialista: this.especialista , especialidad:this.especialidad})
  }

  cancelarTurno(turno: Turno){
    this.storeService.UpdateTurno(turno.id || '', {...turno, estado:'cancelado'})
    this.updateData()
  }

  ngOnInit(): void {
    this.updateData()
    this.storeService.GetUsuarios().subscribe(usrs => {
      this.especialistas = usrs.filter(usr => usr.rol == 'especialista') as Especialista[]
    })
  }

}
