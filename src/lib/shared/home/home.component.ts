import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/lib/servicios/autenticacion.service';
import { StoreManagementService } from 'src/lib/servicios/store-management.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  usuario = this.authService.getUser;

  constructor(
    translate: TranslateService,
    private authService: AuthService,
    private store: StoreManagementService
  ) {}

  getData() {
    this.store.crearUsuariosFake();
  }
  getLoginsFake() {
    this.store.crearLogsFake();
  }
  crearTurnosFake() {
    this.store.crearTurnosFake();
  }

  ngOnInit(): void {}
}
