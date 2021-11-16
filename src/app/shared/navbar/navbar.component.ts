import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  authService: AuthService;

  constructor(private auth: AuthService) {
    this.authService = auth
  }

  ngOnInit(): void {
    console.log(this.authService.getUser)
  }
}
