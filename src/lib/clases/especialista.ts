import { Especialidad } from "./especialidad";
import { Usuario } from "./usuario";

export class EspecialistaDisponiobilidad extends Especialidad {
    disponibilidadSemana ?:string[];
    disponibilidadSabado ?:string[];
}
export class Especialista extends Usuario {
    especialidad !: EspecialistaDisponiobilidad[];
    admin = false;
    rol:string = 'especialista'
}
