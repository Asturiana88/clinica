import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { AuthService } from '../servicios/autenticacion.service';
// Esconde campos por rol
@Directive({
  selector: '[appDisplayIf]',
})
export class DisplayIfDirective implements OnInit {
  @Input() visibleForRole!: ('admin' | 'especialista' | 'paciente')[];

  constructor(private el: ElementRef, private auth: AuthService) {}

  ngOnInit(): void {
    if (
      !this.auth.getUser ||
      !this.visibleForRole.includes(this.auth.getUser.rol)
    ) {
      this.el.nativeElement.style = 'display: none';
    }
  }
}
