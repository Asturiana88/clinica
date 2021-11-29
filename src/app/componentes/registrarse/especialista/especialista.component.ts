import { Component, OnInit } from '@angular/core';
import { Especialidad } from 'src/app/clases/especialidad';
import { Especialista } from 'src/app/clases/especialista';
import { AuthService } from 'src/app/servicios/autenticacion.service';
import { StoreManagementService } from 'src/app/servicios/store-management.service';

@Component({
  selector: 'app-especialista',
  templateUrl: './especialista.component.html',
  styleUrls: ['./especialista.component.scss']
})
export class EspecialistaComponent implements OnInit {

  especialista = new Especialista();
  especialidades = this._store.GetEspecialidades();
  nuevaEspecialidad = new Especialidad()
  singUpError?: any;


  especialidadesSeleccionadas: Especialidad[] = []

  handleClick(especialidad:Especialidad){
    if (this.especialidadesSeleccionadas.find(i => i.nombre == especialidad.nombre)){
      this.especialidadesSeleccionadas = this.especialidadesSeleccionadas.filter(val => val.nombre != especialidad.nombre)
    } else {
      this.especialidadesSeleccionadas = [...this.especialidadesSeleccionadas, especialidad]
    }

    console.log(this.especialidadesSeleccionadas)
  }

  constructor(private authService: AuthService, private _store: StoreManagementService) { }

  crearEspecialidad(){
    if(this.nuevaEspecialidad){
      this._store.CreateEspecialidad({...this.nuevaEspecialidad})
      this.nuevaEspecialidad = new Especialidad()
      this.especialidadesSeleccionadas = []
    }
  }

  ngOnInit(): void {
  }

  registrarse(){
    this.especialista.especialidad = this.especialidadesSeleccionadas;
    this.authService.SignUp(this.especialista)
    .catch((error: any) => {
      this.singUpError = error;
    })
  }

}
