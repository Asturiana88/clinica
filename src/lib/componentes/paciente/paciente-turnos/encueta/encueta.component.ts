import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Turno } from 'src/lib/clases/turno';
import { StoreManagementService } from 'src/lib/servicios/store-management.service';

@Component({
  selector: 'app-encueta',
  templateUrl: './encueta.component.html',
  styleUrls: ['./encueta.component.scss'],
})
export class EncuetaComponent implements OnInit {
  @Input() turno!: Turno;
  @Output() callbackFunc = new EventEmitter<any>();

  encuesta!: string;
  constructor(private store: StoreManagementService) {}

  ngOnInit(): void {}

  submit() {
    if (!this.turno || !this.turno.id || !this.encuesta) {
      return;
    }
    this.store.UpdateTurno(this.turno.id, {
      ...this.turno,
      encuesta: this.encuesta,
    });

    this.callbackFunc.emit(false);
  }
}
