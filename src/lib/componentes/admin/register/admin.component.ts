import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
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
  captchaSolved = false;
  that = this;

  constructor(
    translate: TranslateModule,
    private authService: AuthService,
    private _store: StoreManagementService
  ) {}

  ngOnInit(): void {}

  resolved(e: any): any {
    this.captchaSolved = true;
  }

  registrarse(that: AdminComponent): any {
    // Si usamos this no funciona dentro de la directiva
    if (!that.captchaSolved) {
      that.singUpError = 'Completar el captcha para continuar';
      return;
    }
    if (!that.admin.fotoPerfil) {
      that.singUpError = 'La foto de perfil es requerida';
      return;
    }
    that.authService.SignUp(that.admin).catch((error: any) => {
      that.singUpError = error;
    });
  }

  handleImage(event: any): any {
    if (!event?.target?.files[0]) {
      return;
    }
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
