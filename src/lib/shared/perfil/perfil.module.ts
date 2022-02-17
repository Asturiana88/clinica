import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilRoutingModule } from './perfil-routing.module';
import { PerfilComponent } from './perfil.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [PerfilComponent],
  exports: [PerfilComponent],
  imports: [CommonModule, TranslateModule, PerfilRoutingModule],
})
export class PerfilModule {}
