import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaUsuariosComponent } from './lista-usuarios.component';
import { ListaUsuariosRoutingModule } from './lista-usuarios.routing';



@NgModule({
  declarations: [
    ListaUsuariosComponent
  ],
  imports: [
    CommonModule,
    ListaUsuariosRoutingModule
  ]
})
export class ListaUsuariosModule { }
