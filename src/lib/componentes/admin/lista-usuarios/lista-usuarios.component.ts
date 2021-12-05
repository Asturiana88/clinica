import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/lib/clases/paciente';
import { Usuario } from 'src/lib/clases/usuario';
import { AuthService } from 'src/lib/servicios/autenticacion.service';
import { StoreManagementService } from 'src/lib/servicios/store-management.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss'],
})
export class ListaUsuariosComponent implements OnInit {
  usuarios = this.storeService.GetUsuarios();
  auth = this.authService;
  pacienteSeleccionado?: Paciente;
  modalOpen = false;

  openModal(paciente: Usuario) {
    this.pacienteSeleccionado = paciente as Paciente;
    this.modalOpen = true;
  }

  closeModal() {
    this.pacienteSeleccionado = undefined;
    this.modalOpen = false;
  }

  constructor(
    private storeService: StoreManagementService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}
}
