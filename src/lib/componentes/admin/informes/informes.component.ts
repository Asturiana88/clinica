import { Component, OnInit } from '@angular/core';
import { Log } from 'src/lib/clases/log';
import { LoggerService } from 'src/lib/servicios/logger.service';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.scss'],
})
export class InformesComponent implements OnInit {
  constructor(private logger: LoggerService) {}
  filtros = { logger: { rol: '', desdeFecha: '' } };
  logLabels: any;
  logData: any;

  public lineChartColors = [
    {
      borderColor: 'color',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartOptions = {
    responsive: true,
  };

  ngOnInit(): void {
    this.getLoggerData();
  }

  getLoggerData() {
    this.logger.GetLogIngreso().subscribe((logs) => {
      const data: any = {};
      logs.forEach((log: Log) => {
        const [dia, hora] = log.fecha.split('T');
        //const dia = log.fecha;
        if (this.filtros.logger.rol) {
          if (this.filtros.logger.rol === log.usuario.rol) {
            if (!data[dia]) {
              data[dia] = 1;
            } else {
              data[dia] += 1;
            }
          }
        } else {
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
    console.log(data);
    const labels = Object.keys(data).sort();
    console.log(labels);
    const values = {
      data: labels.map((label) => data[label]),
      label: this.filtros.logger.rol || 'Todos los roles',
    };
    console.log(values);
    this.logLabels = labels;
    this.logData = values;
  }
}
