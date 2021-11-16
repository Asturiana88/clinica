import { Injectable, NgZone } from '@angular/core';
import { Usuario } from "../clases/usuario";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from "@angular/router";
import { Especialista } from '../clases/especialista';
import { Paciente } from '../clases/paciente';
import { BehaviorSubject } from 'rxjs';
import { Administrador } from '../clases/administrador';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any; // Save logged in user data
  singUpError: string = '';
  singInError: string = '';
  isLoading = new BehaviorSubject<boolean>(true);

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user && this.isLoggedIn) {
        user.reload();
        console.log(user.toJSON())
        this.GetUserData((user.toJSON() as Usuario).uid);
      } else {
        this.isLoading.next(false)
      }
    })
  }

  // Sign in with email/password
  SignIn(email: any, password: any) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result: any) => {
        this.GetUserData(result.user.uid);
        this.ngZone.run(() => {
          this.router.navigate(['']);
        });
      }).catch((error: any) => {
        this.singInError = error
      })
  }

  // Sign up with email/password
  SignUp(usuario: Especialista | Paciente | Administrador) {
    return this.afAuth.createUserWithEmailAndPassword(usuario.email, usuario.password || '')
      .then(async (result: any) => {
        this.SetUserData(result.user.toJSON(), usuario);
        (await this.afAuth.currentUser)?.sendEmailVerification().then(res => console.log(res))
        //this.router.navigate(['']);
      })
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const userData = localStorage.getItem('user')
    if (!userData) return false
    const user: Usuario = JSON.parse(userData);
    return !!user
  }

  get isValid(): boolean {
    const userData = localStorage.getItem('user')
    if (!userData) return false
    const user: Usuario = JSON.parse(userData);
    return user.emailVerified && user.approved
  }

  get isValidAdmin(): boolean {
    const userData = localStorage.getItem('user')
    if (!userData) return false
    const user: Administrador = JSON.parse(userData);
    return user.role == 'admin'
  }

  get getUser(){
    const userData = localStorage.getItem('user')
    if(userData){
      const user = JSON.parse(userData || "");
      return user;
    }
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: Usuario, userData: Usuario) {
    const userFormado = {...user, ...userData};
    console.log(userFormado)
    this.isLoading.next(true)
    if (userData){
      this.afs.collection('users')
      .doc(user.uid).set(JSON.parse(JSON.stringify(userFormado))).then(
        (val: any) => {
          localStorage.setItem('user', JSON.stringify(userFormado));
          this.isLoading.next(false)
        }
      );
    }
   }

  GetUserData(userUid:string){
      console.log(userUid)
      this.afs.collection('users')
      .doc(userUid).valueChanges().subscribe(
        (val: any) => {
          console.log(val)
          localStorage.setItem('user', JSON.stringify(val));
          this.isLoading.next(false)
        }
      );
  }

  MakeAdmin() {
    const user = this.getUser
    this.afs.collection('users')
    .doc(user.uid).set({...this.getUser, validated: true, role:'admin'})
    .then(() => this.GetUserData(user.uid));
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    })
  }

}