import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaptchaComponent } from './captcha.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [CaptchaComponent],
  exports: [CaptchaComponent],
  imports: [
    CommonModule,
    RecaptchaModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
})
export class CaptchaModule {}
