import { Usuario } from './usuario';

export class Administrador extends Usuario {
  rol = 'admin';
  approved = true;
}
