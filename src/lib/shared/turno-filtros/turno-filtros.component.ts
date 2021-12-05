import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Filtro } from 'src/lib/clases/filtro';
import { Turno } from 'src/lib/clases/turno';
import { AuthService } from 'src/lib/servicios/autenticacion.service';

@Component({
  selector: 'app-turno-filtros',
  templateUrl: './turno-filtros.component.html',
  styleUrls: ['./turno-filtros.component.scss'],
})
export class TurnoFiltrosComponent implements OnInit {
  @Output() filtrosChange: EventEmitter<Filtro> = new EventEmitter<Filtro>();
  filtros: Filtro = {};

  turno = new Turno();
  mostrarFiltros = false;
  constructor(private auth: AuthService) {}

  ngOnInit(): void {}

  filtrar() {
    if (this.auth.getUser.rol === 'paciente') {
      this.filtros.paciente = this.auth.getUser;
    }
    if (this.auth.getUser.rol === 'especialista') {
      this.filtros.especialista = this.auth.getUser;
    }
    this.filtrosChange.emit(this.filtros);
  }

  borrarFiltros() {
    this.filtros = {};
    if (this.auth.getUser.rol === 'paciente') {
      this.filtros.paciente = this.auth.getUser;
    }
    if (this.auth.getUser.rol === 'especialista') {
      this.filtros.especialista = this.auth.getUser;
    }
    this.filtrosChange.emit(this.filtros);
  }
}
