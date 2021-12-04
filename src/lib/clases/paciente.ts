import { Usuario } from "./usuario";

export class Paciente extends Usuario {
    rol: string = 'paciente'
    obraSocial!: string;
    fotoPerfil2!: string;
}
