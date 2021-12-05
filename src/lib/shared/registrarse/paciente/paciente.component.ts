import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/lib/clases/paciente';
import { AuthService } from 'src/lib/servicios/autenticacion.service';
import { StoreManagementService } from 'src/lib/servicios/store-management.service';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.scss'],
})
export class PacienteComponent implements OnInit {
  paciente = new Paciente();
  singUpError?: any;
  loadingImge = false;
  loadingImge2 = false;
  captchaSolved = false;
  that = this;

  constructor(
    private authService: AuthService,
    private storeService: StoreManagementService
  ) {}

  ngOnInit(): void {}

  resolved(e: any): void {
    this.captchaSolved = true;
  }

  registrarse(that: any): void {
    if (that.captchaSolved) {
      if (!that.paciente.fotoPerfil || !that.paciente.fotoPerfil2) {
        that.singUpError = 'Subir las fotos correspondientes';
      } else {
        that.authService.SignUp(that.paciente).catch((error: any) => {
          that.singUpError = error;
        });
      }
    } else {
      that.singUpError = 'Completar el captcha para continuar';
    }
  }

  handleImage1(event: any): void {
    if (!event?.target?.files[0]) {
      return;
    }

    this.loadingImge = true;
    const randomId = Math.random().toString(36).substring(2);
    this.storeService
      .UploadImage(event.target.files[0], randomId)
      .then(async (res) => {
        this.paciente.fotoPerfil = await res.ref.getDownloadURL();
        this.loadingImge = false;
      });
  }

  handleImage2(event: any): void {
    if (!event?.target?.files[0]) {
      return;
    }
    this.loadingImge2 = true;
    const randomId = Math.random().toString(36).substring(2);
    this.storeService
      .UploadImage(event.target.files[0], randomId)
      .then(async (res) => {
        this.paciente.fotoPerfil2 = await res.ref.getDownloadURL();
        this.loadingImge2 = false;
      });
  }
}
