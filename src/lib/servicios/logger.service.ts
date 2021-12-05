import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Usuario } from '../clases/usuario';
import { AuthService } from './autenticacion.service';

const INGRESO_LOG = 'logIngresos';
@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  constructor(private bd: AngularFirestore, private authService: AuthService) {}

  CrearLogIngreso(user: Usuario) {
    console.log(user);
    if (user) {
      console.log(user);
      this.bd.collection(INGRESO_LOG).add({
        usuario: { ...user },
        fecha: new Date().toISOString(),
      });
    }
  }

  GetLogIngreso() {
    this.bd.collection(INGRESO_LOG).valueChanges();
  }
}
