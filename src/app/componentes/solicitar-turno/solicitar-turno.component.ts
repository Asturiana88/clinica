import { Component, OnInit } from '@angular/core';
import { Especialidad } from 'src/app/clases/especialidad';
import { Especialista } from 'src/app/clases/especialista';
import { AuthService } from 'src/app/servicios/autenticacion.service';
import { StoreManagementService, TURNOS_PATH } from 'src/app/servicios/store-management.service';

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.scss']
})
export class SolicitarTurnoComponent implements OnInit {

  especialidad!: Especialidad;
  especialista!: Especialista;
  fecha!: string;
  hora!: string;

  horas!:string[]
  horasDisponibles!:string[]

  especialidades =  this.storeService.GetEspecialidades()
  especialistas!:Especialista[]

  subscription: any

  constructor(private authService: AuthService,private storeService: StoreManagementService) {
    this.storeService.GetUsuarios().subscribe(usrs => {
      this.especialistas = usrs.filter(usr => usr.rol == 'especialista') as Especialista[]
    })
  }

  getHorarios(){
    if (!this.fecha || !this.especialidad) return;

    this.getHorasDisponibles()
    const turnos = this.storeService.GetTurnos({especialidad: this.especialidad, especialista: this.especialista, fecha: this.fecha})
    this.horasDisponibles = this.horas.filter(hora => !turnos || !turnos.find((turno) => turno.hora == hora))
    this.hora = ''
  }

  solicitarTurno(){
    this.storeService.CreateTurno({
      especialidad: this.especialidad,
      especialista: this.especialista,
      paciente: this.authService.getUser,
      estado: 'pendiente',
      fecha: this.fecha,
      hora: this.hora
    })
  }

  getHorasDisponibles(){
    this.horas = [];
    // lunes a viernes de 8 a 19hs --> base 11
    // sabados de 8 a 14hs --> base 6
    let base = 0
    const date = new Date(this.fecha)
    if (date.getDate() == 6){
      // sabado
      base = 6
    } else if (date.getDate() > 0){
      // dia de semana
      base = 11
    }

    for (let index = 0; index < base*60; index+= this.especialidad.duracionTurno) {
      const minutos = index % 60
      const horas = Math.floor(index/60)

      this.horas = [...this.horas, `${horas}:${minutos}hs`]
    }
  }

  ngOnInit(): void {
  }

}
