import { Especialidad } from "./especialidad";
import { Usuario } from "./usuario";

export class Especialista extends Usuario {
    especialidad !: Especialidad[];
    admin = false;
    rol:string = 'especialista'
}
