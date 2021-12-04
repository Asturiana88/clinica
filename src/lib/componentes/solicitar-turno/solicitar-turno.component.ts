import { Component, OnInit } from '@angular/core';
import { Especialidad } from 'src/lib/clases/especialidad';
import { Especialista } from 'src/lib/clases/especialista';
import { Paciente } from 'src/lib/clases/paciente';
import { Usuario } from 'src/lib/clases/usuario';
import { AuthService } from 'src/lib/servicios/autenticacion.service';
import { StoreManagementService } from 'src/lib/servicios/store-management.service';

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.scss'],
})
export class SolicitarTurnoComponent implements OnInit {
  pacientes?: Paciente[];
  paciente?: Paciente;
  especialidad!: Especialidad;
  especialista!: Especialista;
  fecha!: string;
  hora!: string;

  nombreDias = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sabado',
  ];
  dias: Date[] = [];
  horas!: string[];
  horasDisponibles!: string[];

  especialidades = this.storeService.GetEspecialidades();
  especialistas!: Especialista[];

  subscription: any;

  constructor(
    private authService: AuthService,
    private storeService: StoreManagementService
  ) {
    this.storeService.GetUsuarios().subscribe((usrs) => {
      this.especialistas = usrs.filter(
        (usr) => usr.rol === 'especialista'
      ) as Especialista[];
    });
  }

  getHorarios() {
    if (!this.fecha || !this.especialidad.nombre) {
      return;
    }

    this.getHorasDisponibles();
    const turnos = this.storeService.GetTurnos({
      especialidad: this.especialidad,
      especialista: this.especialista,
      fecha: this.fecha,
    });
    this.horasDisponibles = this.horas.filter(
      (hora) => !turnos || !turnos.find((turno) => turno.hora === hora)
    );
    this.hora = '';
  }

  solicitarTurno() {
    let paciente = this.authService.getUser;

    if (this.authService.isValidAdmin) {
      paciente = this.paciente;
      if (!paciente) {
        return;
      }
    }

    this.storeService.CreateTurno({
      paciente,
      especialidad: this.especialidad,
      especialista: this.especialista,
      estado: 'pendiente',
      fecha: this.fecha,
      hora: this.hora,
    });
  }

  formatNumb(num: number) {
    if (num < 10) {
      return `0${num}`;
    }
    return num;
  }

  addDays(date: Date, days: number) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  getHorasDisponibles() {
    this.horas = [];
    const date = new Date(this.fecha);
    // dia de semana
    let base = 11;
    if (date.getDate() === 0) {
      return;
    }
    if (date.getDay() === 6) {
      // sabado
      base = 6;
    }

    const especialidad = this.especialista.especialidad.find(
      (esp) => esp.nombre === this.especialidad.nombre
    );

    if (base === 6) {
      // sabado
      if (especialidad?.disponibilidadSabado?.length) {
        this.horas = especialidad.disponibilidadSabado.sort();
        return;
      }
    } else {
      // semana
      if (especialidad?.disponibilidadSemana?.length) {
        this.horas = especialidad.disponibilidadSemana.sort();
        return;
      }
    }

    // Todos los horarios disponibles
    for (
      let index = 0;
      index < base * 60;
      index += this.especialidad.duracionTurno
    ) {
      const minutos = this.formatNumb(index % 60);
      const horas = this.formatNumb(8 + Math.floor(index / 60));

      this.horas = [...this.horas, `${horas}:${minutos}hs`];
    }
  }

  ngOnInit(): void {
    const today = new Date();
    for (let index = 0; index < 15; index++) {
      this.dias.push(this.addDays(today, index));
    }

    if (this.authService.isValidAdmin) {
      console.log('asdasd');
      this.storeService.GetUsuarios().subscribe((users: Usuario[]) => {
        this.pacientes = users.filter(
          (user: Usuario) => user.rol === 'paciente'
        ) as Paciente[];
        console.log(this.pacientes);
        console.log(users);
      });
    }
  }
}
