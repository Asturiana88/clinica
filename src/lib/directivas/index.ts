import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormValidationsDirective } from './form-validations.directive';
import { DisplayIfDirective } from './display-if.directive';
import { CaptchaDirective } from './captcha-directive';

@NgModule({
  declarations: [
    FormValidationsDirective,
    DisplayIfDirective,
    CaptchaDirective,
  ],
  exports: [FormValidationsDirective, DisplayIfDirective, CaptchaDirective],
  imports: [CommonModule],
})
export class DirectivesModule {}
