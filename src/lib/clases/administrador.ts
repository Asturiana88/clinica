import { Usuario } from "./usuario";

export class Administrador extends Usuario {
    rol: string = 'admin'
    approved = true;
}
