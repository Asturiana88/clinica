import { Component, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Especialista } from 'src/lib/clases/especialista';
import { Log } from 'src/lib/clases/log';
import { Turno } from 'src/lib/clases/turno';
import { LoggerService } from 'src/lib/servicios/logger.service';
import { StoreManagementService } from 'src/lib/servicios/store-management.service';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.scss'],
})
export class InformesComponent implements OnInit {
  constructor(
    private logger: LoggerService,
    private store: StoreManagementService
  ) {}

  filtrosLogger = { rol: '', desdeFecha: '', hastaFecha: '' };
  logLabels: any;
  logData: any;

  filtrosTurno: {
    desdeFecha: string;
    hastaFecha: string;
    label: 'fecha' | 'especialidad' | 'especialista';
    estado: string;
  } = { estado: '', desdeFecha: '', hastaFecha: '', label: 'fecha' };
  turnoLabels: any;
  turnoData: any;
  turnoFechas: any = [];

  public lineChartColors = [
    {
      borderColor: 'color',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];

  public bareChartColors = [
    {
      borderColor: 'color',
      backgroundColor: 'rgb(56 195 224,.8)',
    },
  ];

  public lineChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  turnos: Turno[] = this.store.GetTurnos({});
  especialistas: string[] = [];
  especialidades: string[] = [];

  ngOnInit(): void {
    this.getLoggerData();
    this.store.GetUsuarios().subscribe((usuarios) => {
      usuarios.forEach((user) => {
        if (user.rol === 'especialista') {
          this.especialistas.push(user.nombre);
        }
      });
    });
    this.store.GetEspecialidades().subscribe((esps) => {
      esps.forEach((esp) => {
        this.especialidades.push(esp.nombre);
      });
    });

    this.getTurnosData();
  }

  getTurnosData() {
    setTimeout(() => {
      const data: any = {};

      this.turnos.forEach((turno) => {
        if (this.turnoFechas.indexOf(turno.fecha) < 0) {
          this.turnoFechas.push(turno.fecha);
        }
      });

      this.turnoFechas.sort();

      if (this.filtrosTurno.label === 'especialista') {
        this.especialistas.forEach((esp) => (data[esp] = 0));
        this.turnos.forEach((turno) => {
          if (this.checkFechasEstado(turno)) {
            data[turno.especialista.nombre] += 1;
          }
        });
      } else if (this.filtrosTurno.label === 'especialidad') {
        this.especialidades.forEach((esp) => (data[esp] = 0));
        this.turnos.forEach((turno) => {
          if (this.checkFechasEstado(turno)) {
            data[turno.especialidad.nombre] += 1;
          }
        });
      } else {
        this.turnos.forEach((turno) => {
          if (this.checkFechasEstado(turno)) {
            if (!data[turno.fecha]) {
              data[turno.fecha] = 1;
            } else {
              data[turno.fecha] += 1;
            }
          }
        });
      }

      const labels = Object.keys(data).sort();
      this.turnoLabels = labels;

      const [letra, ...resto] = this.filtrosTurno.estado;
      const label = [letra?.toUpperCase(), ...resto].join('');
      this.turnoData = {
        data: labels.map((label1) => data[label1]),
        label: label || 'Todos los estados',
      };
    }, 600);
  }

  checkFechasEstado(turno: Turno) {
    const fechaTurno = new Date(turno.fecha);
    const fechaDesde =
      this.filtrosTurno.desdeFecha && new Date(this.filtrosTurno.desdeFecha);
    const fechaHasta =
      this.filtrosTurno.hastaFecha && new Date(this.filtrosTurno.hastaFecha);

    if (this.filtrosTurno.estado && turno.estado !== this.filtrosTurno.estado) {
      return false;
    }

    if (!fechaDesde && !fechaHasta) {
      return true;
    }
    if (!fechaHasta) {
      return fechaDesde <= fechaTurno;
    }
    if (!fechaDesde) {
      return fechaTurno <= fechaHasta;
    }

    return fechaDesde <= fechaTurno && fechaTurno <= fechaHasta;
  }

  getLoggerData() {
    this.logger.GetLogIngreso().subscribe((logs) => {
      const data: any = {};
      logs.forEach((log: Log) => {
        const [dia, hora] = log.fecha.split('T');
        if (
          !this.filtrosLogger.rol ||
          this.filtrosLogger.rol === log.usuario.rol
        ) {
          if (!data[dia]) {
            data[dia] = 1;
          } else {
            data[dia] += 1;
          }
        }
      });
      this.getDataLogger(data);
    });
  }

  getDataLogger(data: any) {
    const labels = Object.keys(data).sort();
    this.logLabels = labels;

    const labelsFiltradas = this.filtarFecha({
      fechas: labels,
      desdeFecha: this.filtrosLogger.desdeFecha,
      hastaFecha: this.filtrosLogger.hastaFecha,
    });

    const [letra, ...resto] = this.filtrosLogger.rol;
    const label = [letra?.toUpperCase(), ...resto].join('');
    this.logData = {
      data: labelsFiltradas.map((label1) => data[label1]),
      label: label || 'Todos los roles',
    };
  }

  filtarFecha(data: {
    fechas: string[];
    desdeFecha: string;
    hastaFecha: string;
  }) {
    const { fechas, desdeFecha, hastaFecha } = data;
    if (!fechas.length) {
      return [];
    }

    fechas.sort();
    const desde = desdeFecha && fechas.indexOf(desdeFecha);
    const hasta = hastaFecha && fechas.indexOf(hastaFecha);

    if (desde && (desde === fechas.length - 1 || (hasta && desde === hasta))) {
      return [fechas[desde]];
    } else if (desde && hasta && desde <= hasta) {
      return fechas.slice(desde, hasta + 1);
    } else if (desde) {
      return fechas.slice(desde, fechas.length - 1);
    } else if (hasta && hasta !== 0) {
      return fechas.slice(0, hasta + 1);
    } else if (hasta === 0) {
      return [fechas[0]];
    }

    return fechas;
  }

  exportAsPDF(id: string, nombre: string) {
    const data = document.getElementById(id);
    if (data) {
      html2canvas(data).then((canvas) => {
        const contentDataURL = canvas.toDataURL('image/png');
        const pdf = new jsPDF('l');
        const imgProps = pdf.getImageProperties(contentDataURL);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(contentDataURL, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${nombre}.pdf`);
      });
    }
  }
}
