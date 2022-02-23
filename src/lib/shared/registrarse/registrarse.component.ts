import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.scss'],
})
export class RegistrarseComponent implements OnInit {
  constructor() {}

  tipo?: 'especialista' | 'paciente';

  ngOnInit(): void {}

  seleccionarTipo(tipo?: 'especialista' | 'paciente') {
    this.tipo = tipo;
  }
}
