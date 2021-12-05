import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HistoriaClinica } from 'src/lib/clases/historia-clinica';
import { Turno } from 'src/lib/clases/turno';
import { StoreManagementService } from 'src/lib/servicios/store-management.service';

@Component({
  selector: 'app-historia-clinica-form',
  templateUrl: './historia-clinica-form.component.html',
  styleUrls: ['./historia-clinica-form.component.scss'],
})
export class HistoriaClinicaFormComponent implements OnInit {
  @Input() turno!: Turno;
  @Output() callbackFunc = new EventEmitter<boolean>(false);

  historia = new HistoriaClinica();
  submitError?: string;
  comentario?: string;

  datosOpcionales: { [key: string]: string }[] = [];
  datoOpcionalNombre!: string;
  datoOpcionalValor!: string;

  validarDatos = false;

  captchaSolved = false;
  that = this;

  inputs = [
    { name: 'altura', requiredError: 'La altura es requerida' },
    { name: 'peso', requiredError: 'El peso es requerida' },
    { name: 'temperatura', requiredError: 'La temperatura es requerida' },
    { name: 'presion', requiredError: 'La presion es requerida' },
  ];

  resolved(e: any): void {
    this.captchaSolved = true;
  }

  constructor(private store: StoreManagementService) {}

  ngOnInit(): void {}

  agregarDatoOpcional() {
    if (this.datoOpcionalNombre && this.datoOpcionalValor) {
      this.datosOpcionales.push({
        [this.datoOpcionalNombre]: this.datoOpcionalValor,
      });
      this.datoOpcionalValor = '';
      this.datoOpcionalNombre = '';
    }
  }

  eliminarDatoOpcional(dato: { [key: string]: string }) {
    this.datosOpcionales = this.datosOpcionales.filter((dat) => dat !== dato);
  }

  finalizar(that: any) {
    let thisClass = this;
    if (that) {
      thisClass = that;
    }
    if (!thisClass.captchaSolved) {
      thisClass.submitError = 'Resolver el captcha para continuar';
      return;
    }

    if (thisClass.datosOpcionales) {
      const datosOpcionales = thisClass.datosOpcionales.reduce(
        (acc, currentVal) => ({ ...acc, ...currentVal }),
        {}
      );
      thisClass.historia = { ...thisClass.historia, ...datosOpcionales };
    }

    if (thisClass.turno && thisClass.turno.id) {
      thisClass.store
        .UpdateTurno(thisClass.turno.id, {
          ...thisClass.turno,
          historiaClinica: { ...thisClass.historia },
          comentario: thisClass.comentario,
          estado: 'finalizado',
        })
        .then(() => {
          if (thisClass.callbackFunc) {
            thisClass.callbackFunc.emit(true);
          }
        })
        .catch((err) => {
          thisClass.submitError = err;
        });
    }
  }
}
