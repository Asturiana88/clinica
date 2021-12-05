import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormValidationsDirective } from './form-validations.directive';

@NgModule({
  declarations: [FormValidationsDirective],
  exports: [FormValidationsDirective],
  imports: [CommonModule],
})
export class DirectivesModule {}
