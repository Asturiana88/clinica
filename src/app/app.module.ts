import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from './../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import {
  AngularFirestore,
  AngularFirestoreModule,
} from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from '../lib/shared/navbar/navbar.component';
import { HomeComponent } from '../lib/shared/home/home.component';
import { LoaderComponent } from '../lib/shared/loader/loader.component';
import { AdminComponent } from '../lib/componentes/admin/register/admin.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { DirectivesModule } from 'src/lib/directivas';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TurnoFiltrosModule } from 'src/lib/shared/turno-filtros/turno-filtros.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoaderComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    FormsModule,
    RecaptchaModule,
    BrowserAnimationsModule,
    DirectivesModule,
    TurnoFiltrosModule,
    ReactiveFormsModule,
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent],
})
export class AppModule {}
