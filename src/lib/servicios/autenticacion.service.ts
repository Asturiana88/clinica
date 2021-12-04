import { Injectable, NgZone } from '@angular/core';
import { Usuario } from '../clases/usuario';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Especialista } from '../clases/especialista';
import { Paciente } from '../clases/paciente';
import { BehaviorSubject } from 'rxjs';
import { Administrador } from '../clases/administrador';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Save logged in user data
  singUpError = '';
  singInError = '';
  singout = false;
  isLoading = new BehaviorSubject<boolean>(true);

  update = true;
  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user && this.update) {
        this.GetUserData((user.toJSON() as Usuario).uid);
      } else {
        this.isLoading.next(false);
        this.update = true;
      }
    });
  }

  async SignIn(email: string, password: string) {
    this.isLoading.next(true);
    if (!email || !password) {
      this.SignOut();
    } else {
      await this.afAuth
        .signInWithEmailAndPassword(email, password)
        .then(async (result: any) => {
          this.singout = false;
          this.ngZone.run(() => {
            this.router.navigate(['']);
          });
        })
        .catch((error: any) => {
          this.singInError = error;
        });
    }
    this.isLoading.next(false);
  }

  SignUp(usuario: Especialista | Paciente | Administrador) {
    return this.afAuth
      .createUserWithEmailAndPassword(usuario.email, usuario.password || '')
      .then(async (result: any) => {
        this.update = false;
        (await this.afAuth.currentUser)?.sendEmailVerification();
        this.router.navigate(['']);
      });
  }

  async GetUserData(userUid: string) {
    this.isLoading.next(true);
    const user = await this.afs.collection('users').doc(userUid).ref.get();
    const data = user.data() as Usuario;
    if (data) {
      if (!this.singout) {
        this.isLoading.next(false);
        localStorage.setItem('user', JSON.stringify(data));
        if (
          data.rol === 'especialista' &&
          (!data.approved || !data.emailVerified)
        ) {
          if (!data.approved) {
            alert(
              'Especialista debe ser aprobado por un admin para poder iniciar sesion'
            );
          } else if (!data.emailVerified) {
            alert('Especialista debe validar email');
          }
          this.SignOut();
        }
      }
      this.isLoading.next(false);
    }
  }

  Validar(uid: string) {
    this.afs.collection('users').doc(uid).update({ approved: true });
  }

  RemoverAcceso(uid: string) {
    this.afs.collection('users').doc(uid).update({ approved: false });
  }

  SignOut() {
    return this.afAuth.signOut().then(() => {
      this.singout = true;
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const userData = localStorage.getItem('user');
    if (!userData) {
      return false;
    }
    const user: Usuario = JSON.parse(userData);
    return !!user;
  }

  get isValid(): boolean {
    const userData = localStorage.getItem('user');
    if (!userData) {
      return false;
    }
    const user: Usuario = JSON.parse(userData);
    return user.emailVerified && user.approved;
  }

  get isValidAdmin(): boolean {
    const userData = localStorage.getItem('user');
    if (!userData) {
      return false;
    }
    const user: Administrador = JSON.parse(userData);
    return user.rol === 'admin';
  }

  get getUser() {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData || '');
      return user;
    }
  }
}
