import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Log } from '../clases/log';
import { Usuario } from '../clases/usuario';
import { AuthService } from './autenticacion.service';

const INGRESO_LOG = 'logIngresos';
@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  constructor(private bd: AngularFirestore, private authService: AuthService) {}

  CrearLogIngreso(user: Usuario) {
    if (user) {
      this.bd.collection<Log>(INGRESO_LOG).add({
        usuario: { ...user },
        fecha: new Date().toISOString(),
      });
    }
  }

  GetLogIngreso() {
    return this.bd.collection<Log>(INGRESO_LOG).valueChanges();
  }
}
