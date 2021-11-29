import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaUsuariosComponent } from './lista-usuarios.component';
import { LoginRoutingModule } from '../login/login.routing';



@NgModule({
  declarations: [
    ListaUsuariosComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule
  ]
})
export class ListaUsuariosModule { }
