import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrarseComponent } from './registrarse.component';
import { RegisterRoutingModule } from './registrarse.routing';
import { EspecialistaComponent } from './especialista/especialista.component';
import { PacienteComponent } from './paciente/paciente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';
import { DirectivesModule } from 'src/lib/directivas';
import { CaptchaModule } from '../captcha/captcha.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    RegistrarseComponent,
    EspecialistaComponent,
    PacienteComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RegisterRoutingModule,
    DirectivesModule,
    TranslateModule,
    RecaptchaModule,
    CaptchaModule,
    CommonModule,
  ],
})
export class RegistrarseModule {}
