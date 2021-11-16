import { Component, OnInit } from '@angular/core';
import { Administrador } from 'src/app/clases/administrador';
import { AuthService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  admin = new Administrador();
  singUpError?: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  registrarse(){
    this.authService.SignUp(this.admin)
    .catch((error: any) => {
      this.singUpError = error;
    })
  }
}
