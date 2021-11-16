import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './servicios/autenticacion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'clinica';
  loading = true

  constructor(private authService: AuthService, private router: Router){
    this.authService.isLoading.subscribe(val => {
      this.loading =val
    })
  }
}
