import { Component, OnInit } from '@angular/core';
import { Especialidad } from 'src/lib/clases/especialidad';
import { Especialista } from 'src/lib/clases/especialista';
import { AuthService } from 'src/lib/servicios/autenticacion.service';
import { StoreManagementService } from 'src/lib/servicios/store-management.service';

@Component({
  selector: 'app-especialista',
  templateUrl: './especialista.component.html',
  styleUrls: ['./especialista.component.scss'],
})
export class EspecialistaComponent implements OnInit {
  especialista = new Especialista();
  especialidades = this._store.GetEspecialidades();
  nuevaEspecialidad = new Especialidad();
  singUpError?: any;
  loadingImge = false;

  especialidadesSeleccionadas: Especialidad[] = [];

  handleImage(event: any) {
    if (!event?.target?.files[0]) return;
    this.loadingImge = true;
    const randomId = Math.random().toString(36).substring(2);
    this._store
      .UploadImage(event.target.files[0], randomId)
      .then(async (res) => {
        this.especialista.fotoPerfil = await res.ref.getDownloadURL();
        this.loadingImge = false;
      });
  }

  handleClick(especialidad: Especialidad) {
    if (
      this.especialidadesSeleccionadas.find(
        (i) => i.nombre == especialidad.nombre
      )
    ) {
      this.especialidadesSeleccionadas =
        this.especialidadesSeleccionadas.filter(
          (val) => val.nombre != especialidad.nombre
        );
    } else {
      this.especialidadesSeleccionadas = [
        ...this.especialidadesSeleccionadas,
        especialidad,
      ];
    }
  }

  constructor(
    private authService: AuthService,
    private _store: StoreManagementService
  ) {}

  crearEspecialidad() {
    if (
      this.nuevaEspecialidad.nombre &&
      this.nuevaEspecialidad.duracionTurno > 30
    ) {
      this._store.CreateEspecialidad({ ...this.nuevaEspecialidad });
      this.nuevaEspecialidad = new Especialidad();
      this.especialidadesSeleccionadas = [];
    }
  }

  ngOnInit(): void {}

  captchaSolved = false;
  registrarse() {
    if (this.captchaSolved) {
      this.especialista.especialidad = this.especialidadesSeleccionadas;
      this.authService.SignUp(this.especialista).catch((error: any) => {
        this.singUpError = error;
      });
    } else {
      this.singUpError = 'Completar el captcha para continuar';
    }
  }

  resolved(e: any) {
    this.captchaSolved = true;
  }
}
