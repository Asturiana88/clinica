import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  usuario = this.authService.getUser;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

}
