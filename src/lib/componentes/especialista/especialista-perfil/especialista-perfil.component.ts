import { Component, OnInit } from '@angular/core';
import {
  Especialista,
  EspecialistaDisponiobilidad,
} from 'src/lib/clases/especialista';
import { AuthService } from 'src/lib/servicios/autenticacion.service';
import { StoreManagementService } from 'src/lib/servicios/store-management.service';

@Component({
  selector: 'app-especialista-perfil',
  templateUrl: './especialista-perfil.component.html',
  styleUrls: ['./especialista-perfil.component.scss'],
})
export class EspecialistaPerfilComponent implements OnInit {
  especialista = this.auth.getUser as Especialista;

  constructor(
    private auth: AuthService,
    private storeService: StoreManagementService
  ) {}

  horariosSabado!: string[];
  horariosSemana!: string[];

  horariosSeleccionadosSabado: string[] = [];
  horariosSeleccionadosSemana: string[] = [];

  especialidad!: EspecialistaDisponiobilidad;

  ngOnInit(): void {}

  seleccionar(tipo: string) {
    if (tipo == 'sabado') {
      this.horariosSeleccionadosSabado = [...this.horariosSabado];
    } else {
      this.horariosSeleccionadosSemana = [...this.horariosSemana];
    }
  }

  handleHorario(horario: string, tipo: string) {
    if (tipo == 'sabado') {
      if (!this.horariosSeleccionadosSabado) {
        this.horariosSeleccionadosSabado = [horario];
      } else if (this.horariosSeleccionadosSabado.includes(horario)) {
        this.horariosSeleccionadosSabado =
          this.horariosSeleccionadosSabado.filter((h) => h != horario);
      } else {
        this.horariosSeleccionadosSabado = [
          ...this.horariosSeleccionadosSabado,
          horario,
        ];
      }
    } else {
      if (!this.horariosSeleccionadosSemana) {
        this.horariosSeleccionadosSemana = [horario];
      } else if (this.horariosSeleccionadosSemana.includes(horario)) {
        this.horariosSeleccionadosSemana =
          this.horariosSeleccionadosSemana.filter((h) => h != horario);
      } else {
        this.horariosSeleccionadosSemana = [
          ...this.horariosSeleccionadosSemana,
          horario,
        ];
      }
    }
  }

  formatNumb(num: number) {
    if (num < 10) return `0${num}`;
    return num;
  }

  hFormater(base: number, duracion: number) {
    let horasDisponibles: string[] = [];
    for (let index = 0; index < base * 60; index += duracion) {
      const minutos = this.formatNumb(index % 60);
      const horas = this.formatNumb(8 + Math.floor(index / 60));

      horasDisponibles = [...horasDisponibles, `${horas}:${minutos}hs`];
    }
    return horasDisponibles;
  }

  setupHorarios() {
    const currEsp = this.especialista.especialidad.find(
      (e) => e.nombre == this.especialidad.nombre
    );
    this.horariosSeleccionadosSabado = currEsp?.disponibilidadSabado || [];
    this.horariosSeleccionadosSemana = currEsp?.disponibilidadSemana || [];

    if (!this.especialidad) return;
    this.horariosSabado = this.hFormater(6, this.especialidad.duracionTurno);
    this.horariosSemana = this.hFormater(11, this.especialidad.duracionTurno);
  }

  updateDisponibilidad() {
    this.especialidad.disponibilidadSabado =
      this.horariosSeleccionadosSabado || [];
    this.especialidad.disponibilidadSemana =
      this.horariosSeleccionadosSemana || [];

    const update = { ...this.especialista } as Especialista;
    update.especialidad = update.especialidad.map((e) => {
      if (e.nombre == this.especialidad.nombre) {
        return this.especialidad;
      }
      return e;
    });

    this.storeService.UpdateUsuario(this.especialista.uid, update);
  }
}
