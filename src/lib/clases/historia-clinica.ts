interface DatoDinamico {
  [key: string]: any;
}
export class HistoriaClinica implements DatoDinamico {
  altura!: number;
  temperatura!: number;
  presion!: number;
  peso!: number;
}
