import { Especialidad } from './especialidad';
import { Especialista } from './especialista';
import { HistoriaClinica } from './historia-clinica';
import { Paciente } from './paciente';

export class Turno {
  especialidad!: Especialidad;
  especialista!: Especialista;
  paciente!: Paciente;
  resena?: string;
  comentario?: string;
  calificacion?: {
    comentario: string;
    puntuacionAtencion: number;
    solucionoSuProblema: boolean;
    mediosDeComunicacion: string[];
    probabilidadDeRecomendacion: number;
  };
  estado!: 'pendiente' | 'aceptado' | 'rechazado' | 'cancelado' | 'finalizado';
  encuesta?: any;
  id?: string;
  fecha!: string;
  hora!: string;
  historiaClinica?: HistoriaClinica;
}
