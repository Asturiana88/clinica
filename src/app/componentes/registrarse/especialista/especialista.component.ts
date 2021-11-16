import { Component, OnInit } from '@angular/core';
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
  nuevaEspecialidad = '';
  singUpError?: any;


  especialidadesSeleccionadas: string[] = []

  handleClick(especialidad:string){
    if (this.especialidadesSeleccionadas.includes(especialidad)){
      this.especialidadesSeleccionadas = this.especialidadesSeleccionadas.filter(val => val != especialidad)
    } else {
      this.especialidadesSeleccionadas = [...this.especialidadesSeleccionadas, especialidad]
    }

    console.log(this.especialidadesSeleccionadas)
  }

  constructor(private authService: AuthService, private _store: StoreManagementService) { }

  crearEspecialidad(){
    if(this.nuevaEspecialidad){
      this._store.CreateEspecialidad(this.nuevaEspecialidad)
      this.nuevaEspecialidad = '';
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
