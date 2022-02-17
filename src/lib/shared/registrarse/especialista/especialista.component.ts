import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
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
  especialidades = this.store.GetEspecialidades();
  nuevaEspecialidad = new Especialidad();
  singUpError?: any;
  loadingImge = false;

  that = this;
  especialidadesSeleccionadas: Especialidad[] = [];
  captchaSolved = false;

  handleImage(event: any) {
    if (!event?.target?.files[0]) {
      return;
    }
    this.loadingImge = true;
    const randomId = Math.random().toString(36).substring(2);
    this.store
      .UploadImage(event.target.files[0], randomId)
      .then(async (res) => {
        this.especialista.fotoPerfil = await res.ref.getDownloadURL();
        this.loadingImge = false;
      });
  }

  handleClick(especialidad: Especialidad) {
    if (
      this.especialidadesSeleccionadas.find(
        (i) => i.nombre === especialidad.nombre
      )
    ) {
      this.especialidadesSeleccionadas =
        this.especialidadesSeleccionadas.filter(
          (val) => val.nombre !== especialidad.nombre
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
    translate: TranslateModule,
    private store: StoreManagementService
  ) {}

  crearEspecialidad() {
    if (
      this.nuevaEspecialidad.nombre &&
      this.nuevaEspecialidad.duracionTurno > 30
    ) {
      this.store.CreateEspecialidad({ ...this.nuevaEspecialidad });
      this.nuevaEspecialidad = new Especialidad();
      this.especialidadesSeleccionadas = [];
    }
  }

  ngOnInit(): void {}

  registrarse(that: EspecialistaComponent) {
    if (that.captchaSolved) {
      if (
        !that.especialidadesSeleccionadas ||
        !that.especialidadesSeleccionadas.length
      ) {
        that.singUpError = 'Al menos debe seleccionar una especialidad';
      } else if (!that.especialista.fotoPerfil) {
        that.singUpError = 'Foto del especialista es requerida';
      } else {
        that.especialista.especialidad = that.especialidadesSeleccionadas;
        that.authService.SignUp(that.especialista).catch((error: any) => {
          that.singUpError = error;
        });
      }
    } else {
      that.singUpError = 'Completar el captcha para continuar';
    }
  }

  resolved(e?: any) {
    this.captchaSolved = true;
  }
}
