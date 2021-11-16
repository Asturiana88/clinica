import { Usuario } from "./usuario";

export class Administrador extends Usuario {
    role: string = 'admin'
    approved = true;
}
