import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormValidationsDirective } from './form-validations.directive';
import { DisplayIfDirective } from './display-if.directive';

@NgModule({
  declarations: [FormValidationsDirective, DisplayIfDirective],
  exports: [FormValidationsDirective, DisplayIfDirective],
  imports: [CommonModule],
})
export class DirectivesModule {}
