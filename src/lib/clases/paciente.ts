import { Usuario } from './usuario';

export class Paciente extends Usuario {
  rol = 'paciente';
  obraSocial!: string;
  fotoPerfil2!: string;
}
