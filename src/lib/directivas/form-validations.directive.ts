import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appFormValidations]',
})
export class FormValidationsDirective implements OnInit {
  @Input() inputs!: { name: string; requiredError: string }[];
  @Input() submit?: any;
  @Input() that?: any;

  isValid = false;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    // Si pasa funcionalidad para submit =>  @Input() submit => [submit]-"func"
    // agregamos al submit del form la siguiente funcionalidad
    if (this.submit) {
      (this.el.nativeElement as HTMLFormElement).onsubmit = () => {
        // tomamos el elemento con la directiva que va a ser un form
        // cuando haga submit corremos las validaciones
        this.validation();
        if (this.isValid) {
          // Si las validaciones estan bien se ejecuta la funcion submit

          // tslint:disable-next-line: no-unused-expression
          this.submit && this.submit(this.that);

          // Agregamos 'that' a submit porque 'this' suele usarse para ejecutar codigo dentro de esa funcion
          // 'that' es la instancia del componente
        }
      };
    }
    this.addEventListenerToValidationClass();
    this.addEventListenerToProvidedInputs();
  }

  // ******************************************************************
  // *AGREGA VALIDACIONES A TODOS LOS INPUTS QUE TENGAN CLASE REQUIRED *
  // ******************************************************************
  addEventListenerToValidationClass() {
    this.el.nativeElement
      .querySelectorAll('.required')
      .forEach((element: HTMLInputElement) => {
        element.addEventListener('blur', () => {
          this.addErrorElem(
            element,
            'El campo es requerido',
            `requiredFields-${element.name}`
          );
        });
      });
  }

  addErrorElem(elem: HTMLInputElement, msj: string, id: string) {
    // Primero limpia errores preexistentes
    this.cleanErrors(`.validation-${id}`);
    if (!elem.value) {
      // Si hay error invalida los checks y agrega un elemento despues del input con el mensaje de error
      this.isValid = false;
      elem.insertAdjacentHTML(
        'afterend',
        `<div style="display:block !important" class="invalid-feedback validation validation-${id}">
          ${msj}
        </div>`
      );
    }
  }

  cleanErrors(id?: string) {
    if (id) {
      this.el.nativeElement
        .querySelectorAll(`${id}`)
        .forEach((element: HTMLDivElement) => {
          element.remove();
        });
    } else {
      this.el.nativeElement
        .querySelectorAll('.validation')
        .forEach((elem: HTMLDivElement) => elem.remove());
    }
  }

  validation(): void {
    this.cleanErrors();
    this.isValid = true;

    // Ejecuta validacion en todos los inputs con clase required
    (
      this.el.nativeElement.querySelectorAll(`.required`) as HTMLInputElement[]
    ).forEach((element) => {
      this.addErrorElem(
        element,
        'El campo es requerido',
        `requiredFields-${element.name}`
      );
    });

    if (this.inputs) {
      this.inputs.forEach((inp) => {
        const input = this.el.nativeElement.querySelector(
          `input[name="${inp.name}"]`
        ) as HTMLInputElement;
        if (input) {
          this.addErrorElem(input, inp.requiredError, inp.name);
        }
      });
    }
  }

  addEventListenerToProvidedInputs() {
    this.el.nativeElement
      .querySelectorAll('input')
      .forEach((element: HTMLInputElement) => {
        const name = element.name;
        const input = this.inputs && this.inputs.find((el) => el.name === name);
        if (input) {
          element.addEventListener('blur', () => {
            this.addErrorElem(element, input.requiredError, input.name);
          });
        }
      });
  }
}
