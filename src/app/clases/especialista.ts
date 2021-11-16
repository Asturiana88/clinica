import { Usuario } from "./usuario";

export class Especialista extends Usuario {
    especialidad !: string[];
    admin = false;
    rol:string = 'especialista'
}
