import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaUsuariosComponent } from './lista-usuarios.component';
import { ListaUsuariosRoutingModule } from './lista-usuarios.routing';
import { ModalModule } from 'src/lib/shared/modal/modal.module';
import { HistoriaClinicaModule } from 'src/lib/shared/historia-clinica/historia-clinica.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ListaUsuariosComponent],
  imports: [
    CommonModule,
    ModalModule,
    HistoriaClinicaModule,
    TranslateModule,
    ListaUsuariosRoutingModule,
  ],
})
export class ListaUsuariosModule {}
