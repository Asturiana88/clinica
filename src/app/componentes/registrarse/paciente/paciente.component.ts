import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/clases/paciente';
import { AuthService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.scss']
})
export class PacienteComponent implements OnInit {

  paciente = new Paciente();
  singUpError?: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  registrarse(){
    this.authService.SignUp(this.paciente)
    .catch((error: any) => {
      this.singUpError = error;
    })
  }

}
