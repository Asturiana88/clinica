import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/lib/servicios/autenticacion.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  user = this.auth.getUser;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {}
}
