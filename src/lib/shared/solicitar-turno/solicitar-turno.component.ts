import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
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
  especialidad?: Especialidad;
  especialista?: Especialista;
  fecha!: string;
  hora!: string;

  step: 'especialista' | 'especialidad' | 'fecha' = 'especialista';

  turnoOpciones: string[][] = [];

  setEspecialidad(especialidad?: Especialidad) {
    this.especialidad = especialidad;
    if (especialidad) {
      this.step = 'fecha';
      const horarios: any[] = [];
      this.dias.map((dia) => {
        horarios.push(
          this.getHorasDisponibles(dia.toISOString().split('T')[0])
        );
      });
      console.log(horarios);
    } else {
      this.step = 'especialidad';
      this.turnoOpciones = [];
    }
  }

  setEspecialista(especialista?: Especialista) {
    this.especialista = especialista;
    if (especialista) {
      this.step = 'especialidad';
    } else {
      this.step = 'especialista';
    }
  }

  hasEspecialidad(especialidad: Especialidad) {
    return this.especialista?.especialidad.find(
      (esp) => esp.nombre == especialidad.nombre
    );
  }

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
  especialistasFilter!: Especialista[];
  especialistas!: Especialista[];

  subscription: any;

  constructor(
    private authService: AuthService,
    translate: TranslateModule,
    private storeService: StoreManagementService
  ) {
    this.storeService.GetUsuarios().subscribe((usrs) => {
      this.especialistas = usrs.filter(
        (usr) => usr.rol === 'especialista'
      ) as Especialista[];
      this.especialistasFilter = [...this.especialistas];
    });
  }

  updateEspecialistas() {
    this.especialistas = this.especialistasFilter.filter(
      (esp) =>
        esp.especialidad &&
        esp.especialidad.find(
          (espld) => espld.nombre === this.especialidad?.nombre
        )
    );
    this.getHorarios();
  }

  async getHorarios() {
    if (!this.fecha || !this.especialidad?.nombre) {
      return;
    }

    this.getHorasDisponibles();
    const turnos = await this.storeService.GetTurnos({
      especialidad: this.especialidad,
      especialista: this.especialista,
      fecha: this.fecha,
    });
    this.horasDisponibles = this.horas.filter(
      (hora) => !turnos || !turnos.find((turno) => turno.hora === hora)
    );
    this.hora = '';
  }

  solicitarTurno(that?: any) {
    let thisObj = this;
    if (that) {
      thisObj = that;
    }
    let paciente = thisObj.authService.getUser;

    if (thisObj.authService.isValidAdmin) {
      paciente = thisObj.paciente;
      if (!paciente) {
        return;
      }
    }

    if (thisObj.especialidad && thisObj.especialista) {
      thisObj.storeService.CreateTurno({
        paciente,
        especialidad: thisObj.especialidad,
        especialista: thisObj.especialista,
        estado: 'pendiente',
        fecha: thisObj.fecha,
        hora: thisObj.hora,
      });
    }
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

  getHorasDisponibles(fecha?: string) {
    this.horas = [];
    const date = new Date(fecha || this.fecha);
    // dia de semana
    let base = 11;
    if (date.getDate() === 0) {
      return;
    }
    if (date.getDay() === 6) {
      // sabado
      base = 6;
    }

    const especialidad =
      this?.especialista?.especialidad &&
      this?.especialista.especialidad.find(
        (esp) => esp.nombre === this?.especialidad?.nombre
      );

    if (base === 6) {
      // sabado
      if (especialidad?.disponibilidadSabado?.length) {
        this.horas = especialidad.disponibilidadSabado.sort();
        return especialidad.disponibilidadSabado.sort();
      }
    } else {
      // semana
      if (especialidad?.disponibilidadSemana?.length) {
        this.horas = especialidad.disponibilidadSemana.sort();
        return especialidad.disponibilidadSemana.sort();
      }
    }

    // Todos los horarios disponibles
    if (this?.especialidad?.duracionTurno)
      for (
        let index = 0;
        index < base * 60;
        index += this.especialidad.duracionTurno
      ) {
        const minutos = this.formatNumb(index % 60);
        const horas = this.formatNumb(8 + Math.floor(index / 60));

        this.horas = [...this.horas, `${horas}:${minutos}hs`];
      }
    return this.horas;
  }

  ngOnInit(): void {
    const today = new Date();
    for (let index = 0; index < 15; index++) {
      this.dias.push(this.addDays(today, index));
    }

    if (this.authService.isValidAdmin) {
      this.storeService.GetUsuarios().subscribe((users: Usuario[]) => {
        this.pacientes = users.filter(
          (user: Usuario) => user.rol === 'paciente'
        ) as Paciente[];
      });
    }
  }
}
