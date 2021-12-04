import { Component, OnInit } from '@angular/core';
import { Administrador } from 'src/lib/clases/administrador';
import { AuthService } from 'src/lib/servicios/autenticacion.service';
import { StoreManagementService } from 'src/lib/servicios/store-management.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  admin = new Administrador();
  singUpError?: any;
  loadingImge = false;

  constructor(
    private authService: AuthService,
    private _store: StoreManagementService
  ) {}

  ngOnInit(): void {}

  captchaSolved = false;
  resolved(e: any) {
    this.captchaSolved = true;
  }

  registrarse() {
    if (!this.captchaSolved) {
      this.singUpError = 'Completar el captcha para continuar';
      return;
    }
    this.authService.SignUp(this.admin).catch((error: any) => {
      this.singUpError = error;
    });
  }

  handleImage(event: any) {
    if (!event?.target?.files[0]) return;
    this.loadingImge = true;
    const randomId = Math.random().toString(36).substring(2);
    this._store
      .UploadImage(event.target.files[0], randomId)
      .then(async (res) => {
        this.admin.fotoPerfil = await res.ref.getDownloadURL();
        this.loadingImge = false;
      });
  }
}
