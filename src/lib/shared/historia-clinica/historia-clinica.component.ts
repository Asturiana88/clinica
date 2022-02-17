import { Component, Input, OnInit } from '@angular/core';
import { HistoriaClinica } from 'src/lib/clases/historia-clinica';
import { Paciente } from 'src/lib/clases/paciente';
import { Turno } from 'src/lib/clases/turno';
import { AuthService } from 'src/lib/servicios/autenticacion.service';
import { StoreManagementService } from 'src/lib/servicios/store-management.service';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.scss'],
})
export class HistoriaClinicaComponent implements OnInit {
  @Input() paciente?: Paciente;
  turnos!: Turno[];

  constructor(
    translate: TranslateService,
    private auth: AuthService,
    private store: StoreManagementService
  ) {}

  ngOnInit(): void {
    this.getTurnos();
  }

  async getTurnos() {
    let paciente = this.paciente;
    const rol = this.auth.getUser.rol;
    if (rol === 'paciente') {
      paciente = this.auth.getUser;
    }
    this.turnos = await this.store.GetTurnos({
      paciente,
      historia: true,
    });
  }

  getDatosDinamicos(turno: Turno) {
    if (turno.historiaClinica) {
      const keys = Object.keys(turno.historiaClinica).filter(
        (key) => !['altura', 'temperatura', 'presion', 'peso'].includes(key)
      );
      const valores = keys.map((key) => ({
        nombre: key,
        valor: (turno.historiaClinica as HistoriaClinica)[
          key as keyof HistoriaClinica
        ],
      }));
      return valores;
    }
    return [];
  }

  downloadFile() {
    const header = [
      'Fecha',
      'Hora',
      'Especialidad',
      'Especialista',
      'Comentario',
      'Altura',
      'Peso',
      'Presion',
      'Temperatura',
      'Otros Datos 1',
      'Otros Datos 2',
      'Otros Datos 3',
    ];

    const csv = this.turnos.map((turno) => [
      turno.fecha,
      turno.hora,
      turno.especialidad.nombre,
      turno.especialista.nombre,
      turno.comentario,
      turno.historiaClinica?.altura,
      turno.historiaClinica?.peso,
      turno.historiaClinica?.presion,
      turno.historiaClinica?.temperatura,
      ...this.getDatosDinamicos(turno).map(
        (dato, i) => `${dato.nombre}: ${dato.valor}`
      ),
    ]);

    const blob = new Blob([[header, ...csv].join('\r\n')], {
      type: 'text/csv',
    });
    saveAs(
      blob,
      `historia-clinica-${this.paciente?.nombre} ${this.paciente?.apellido}.csv`
    );
  }

  exportAsPDF() {
    const data = document.getElementById('data');
    if (data) {
      html2canvas(data).then((canvas) => {
        const contentDataURL = canvas.toDataURL('image/png');
        const pdf = new jsPDF('l');
        const imgProps = pdf.getImageProperties(contentDataURL);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(contentDataURL, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('Filename.pdf');
      });
    }
  }
}
