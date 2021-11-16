import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService) { }

  email!: string;
  password!: string;

  ngOnInit(): void {
  }

  login(){
    this.auth.SignIn(this.email, this.password)
  }

}
