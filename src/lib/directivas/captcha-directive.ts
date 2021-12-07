import {
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewContainerRef,
} from '@angular/core';
import { CaptchaEnableService } from '../servicios/captcha-enable.service';
import { CaptchaComponent } from '../shared/captcha/captcha.component';

@Directive({
  selector: '[appCaptcha]',
})
export class CaptchaDirective implements OnInit {
  constructor(
    private element: ElementRef,
    private viewContainerRef: ViewContainerRef,
    private captcha: CaptchaEnableService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  @Output() resolve = new EventEmitter<boolean>(false);

  ngOnInit() {
    this.captcha.GetCaptcha().subscribe((enabled) => {
      if (enabled?.activo) {
        const componentFactory =
          this.componentFactoryResolver.resolveComponentFactory(
            CaptchaComponent
          );
        const componentRef =
          this.viewContainerRef.createComponent(componentFactory);

        componentRef.instance.resolve.subscribe((val) => {
          this.resolve.emit(val);
        });

        const host = this.element.nativeElement;
        const form = host.closest('form');
        if (host) {
          host.insertAfter(
            componentRef.location.nativeElement,
            host.firstChild
          );
        }
      }
    });
  }
}
