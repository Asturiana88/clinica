import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrarseComponent } from './registrarse.component';
import { RegisterRoutingModule } from './registrarse.routing';
import { EspecialistaComponent } from './especialista/especialista.component';
import { PacienteComponent } from './paciente/paciente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    RegistrarseComponent,
    EspecialistaComponent,
    PacienteComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RegisterRoutingModule,
    CommonModule
  ]
})
export class RegistrarseModule { }
