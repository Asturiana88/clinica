import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/lib/servicios/autenticacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private auth: AuthService) {}

  email!: string;
  password!: string;

  ngOnInit(): void {}

  customLogin(rol: string): void {
    if (rol === 'admin') {
      this.auth.SignIn('julietaorce@gmail.com', 'test123');
    } else if (rol === 'especialista') {
      this.auth.SignIn('hefabi2085@hagendes.com', '123456');
    } else {
      this.auth.SignIn('xogen93247@gruppies.com', '123456');
    }
  }

  login(): void {
    this.auth.SignIn(this.email, this.password);
  }
}
