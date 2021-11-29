import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor(private auth: AuthService, private router: Router) { }
  canActivate(): boolean {
    if (!(this.auth.getUser?.rol == 'paciente')) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
