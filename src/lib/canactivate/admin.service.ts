import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../servicios/autenticacion.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (!this.auth.isValidAdmin) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
