import { Especialidad } from './especialidad';
import { Especialista } from './especialista';
import { Paciente } from './paciente';

export class Turno {
  especialidad!: Especialidad;
  especialista!: Especialista;
  paciente!: Paciente;
  resena?: string;
  comentario?: string;
  calificacion?: string;
  estado!: 'pendiente' | 'aceptado' | 'rechazado' | 'cancelado' | 'finalizado';
  encuesta?: any;
  id?: string;
  fecha!: string;
  hora!: string;
}
