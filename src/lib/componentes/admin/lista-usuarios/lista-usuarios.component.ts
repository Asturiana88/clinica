import { Component, OnInit } from '@angular/core';
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

  constructor(
    private storeService: StoreManagementService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}
}
