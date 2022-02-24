import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from 'src/lib/servicios/autenticacion.service';

type Usuario = 'guadalupe' | 'juli' | 'melvin' | 'todd' | 'regina' | 'gloria';

const USER_DATA = {
  guadalupe: {
    email: 'zunijyjy@musiccode.me',
    password: 'test123',
    image:
      'https://firebasestorage.googleapis.com/v0/b/sala-de-juegos-db.appspot.com/o/aowvmblv9c?alt=media&token=8c5f6b01-af9c-4140-810f-f8562c4c031e',
  },
  juli: {
    email: 'julietaorce@gmail.com',
    password: 'test123',
    image:
      'https://media-exp1.licdn.com/dms/image/C5603AQHyNBlIw53D5g/profile-displayphoto-shrink_200_200/0/1606221901002?e=1651104000&v=beta&t=UMcGoWK8ofuGaIYkiUnaa-KE7SDqr4xsUozGF-pH_cE',
  },
  melvin: {
    email: 'qubukiwa@musiccode.me',
    password: 'test123',
    image:
      'https://firebasestorage.googleapis.com/v0/b/sala-de-juegos-db.appspot.com/o/cxfquady17t?alt=media&token=0aab4a83-3aa7-4c33-b3fe-1e00317c9bcb',
  },
  todd: {
    email: 'ludusi@ryteto.me',
    password: 'test123',
    image:
      'https://firebasestorage.googleapis.com/v0/b/sala-de-juegos-db.appspot.com/o/j4vdq5ezw3?alt=media&token=8ff78a00-da63-4939-b118-aac291877224',
  },
  regina: {
    email: 'gusuvuje@ryteto.me',
    password: 'test123',
    image:
      'https://firebasestorage.googleapis.com/v0/b/sala-de-juegos-db.appspot.com/o/rmfqpp12dan?alt=media&token=fb909ad0-63be-4b76-a1bb-cbeebdcf3dda',
  },
  gloria: {
    email: 'nirivypo@thecarinformation.com',
    password: 'test123',
    image:
      'https://firebasestorage.googleapis.com/v0/b/sala-de-juegos-db.appspot.com/o/pnp13lw2z9s?alt=media&token=40456cd0-b899-417b-a352-8fa22efc47fa',
  },
} as { [key: string]: { email: string; password: string; image: string } };

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private auth: AuthService, translate: TranslateModule) {}

  email!: string;
  password!: string;

  ngOnInit(): void {}

  customLogin(nombre: Usuario): void {
    const usuario = USER_DATA[nombre];
    this.auth.SignIn(usuario.email, usuario.password);
    /*     if (rol === 'admin') {
      this.auth.SignIn('julietaorce@gmail.com', 'test123');
    } else if (rol === 'especialista') {
      this.auth.SignIn('hefabi2085@hagendes.com', '123456');
    } else {
      this.auth.SignIn('xogen93247@gruppies.com', '123456');
    } */
  }

  getPhoto(nombre: Usuario) {
    const usuario = USER_DATA[nombre];
    return usuario.image;
  }

  login(): void {
    this.auth.SignIn(this.email, this.password);
  }
}
