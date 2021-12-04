import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/autenticacion.service';

@Injectable({
  providedIn: 'root',
})
export class EspecialistaService {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate(): boolean {
    if (!(this.auth.getUser?.rol == 'especialista')) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
