import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from './../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestore, AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistrarseComponent } from './componentes/registrarse/registrarse.component';
import { EspecialistaComponent } from './componentes/registrarse/especialista/especialista.component';
import { PacienteComponent } from './componentes/registrarse/paciente/paciente.component';
import { HomeComponent } from './componentes/home/home.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { AdminComponent } from './componentes/registrarse/admin/admin.component';
import { ListaUsuariosComponent } from './componentes/lista-usuarios/lista-usuarios.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegistrarseComponent,
    EspecialistaComponent,
    PacienteComponent,
    HomeComponent,
    LoaderComponent,
    AdminComponent,
    ListaUsuariosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
