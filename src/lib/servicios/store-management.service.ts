import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { Administrador } from '../clases/administrador';
import { Especialidad } from '../clases/especialidad';
import { Especialista } from '../clases/especialista';
import { HistoriaClinica } from '../clases/historia-clinica';
import { Paciente } from '../clases/paciente';
import { Turno } from '../clases/turno';
import { AuthService } from './autenticacion.service';

export const ESPECIALIDAD_PATH = 'especialidad';
export const USURARIOS_PATH = 'users';
export const TURNOS_PATH = 'turnos';

@Injectable({
  providedIn: 'root',
})
export class StoreManagementService {
  constructor(
    private bd: AngularFirestore,
    private authService: AuthService,
    public router: Router,
    private afStorage: AngularFireStorage
  ) {}

  uploadProgress = 0;

  GetEspecialidades() {
    const collection = this.bd.collection<Especialidad>(ESPECIALIDAD_PATH);
    return collection.valueChanges();
  }

  async GetTurnos(props: {
    fecha?: string;
    hora?: string;
    paciente?: Paciente | string;
    estado?: string;
    historia?: boolean;
    especialidad?: Especialidad | string;
    especialista?: Especialista | string;
    altura?: string;
    peso?: string;
    temperatura?: string;
    presion?: string;
    valorDinamico?: string;
    resena?: string;
    encuesta?: string;
    comentario?: string;
  }) {
    const {
      historia,
      fecha,
      estado,
      hora,
      paciente,
      especialidad,
      especialista,
      altura,
      peso,
      temperatura,
      presion,
      valorDinamico,
      resena,
      encuesta,
      comentario,
    } = props || {};
    const collection = this.bd.collection<Turno>(TURNOS_PATH);
    const turnos: Turno[] = [];

    await collection.get().forEach((actions) => {
      return actions.docs.map((a) => {
        const data = a.data() as Turno;
        const id = a.id;

        let returnVal = true;
        if (fecha && returnVal) {
          returnVal = data.fecha === fecha;
        }
        if (hora && returnVal) {
          returnVal = data.hora === hora;
        }
        if (estado && returnVal) {
          returnVal = data.estado.toLowerCase().includes(estado.toLowerCase());
        }
        if (historia && returnVal) {
          returnVal = !!data.historiaClinica;
        }

        if (altura && returnVal) {
          returnVal = data.historiaClinica?.altura.toString() === altura;
        }
        if (peso && returnVal) {
          returnVal = data.historiaClinica?.peso.toString() === peso;
        }
        if (presion && returnVal) {
          returnVal = data.historiaClinica?.presion.toString() === presion;
        }
        if (temperatura && returnVal) {
          returnVal =
            data.historiaClinica?.temperatura.toString() === temperatura;
        }
        if (valorDinamico && returnVal && data.historiaClinica) {
          const standardAttrs = ['altura', 'temperatura', 'presion', 'peso'];
          const keys = Object.keys(data.historiaClinica).filter(
            (key) => !standardAttrs.includes(key)
          );
          returnVal = !!keys.find((key) =>
            (data.historiaClinica as HistoriaClinica)[
              key as keyof HistoriaClinica
            ]
              .toString()
              .toLowerCase()
              .includes(valorDinamico.toLowerCase())
          );
        }
        if (resena && returnVal) {
          returnVal = !!data.resena
            ?.toLowerCase()
            .includes(resena.toLowerCase());
        }
        if (encuesta && returnVal) {
          returnVal = !!data.encuesta
            ?.toLowerCase()
            .includes(encuesta.toLowerCase());
        }
        if (comentario && returnVal) {
          returnVal = !!data.comentario
            ?.toLowerCase()
            .includes(comentario.toLowerCase());
        }
        if (paciente && returnVal) {
          if (typeof paciente === 'string') {
            returnVal = data.paciente.nombre
              .toLowerCase()
              .includes(paciente.toLowerCase());
          } else {
            returnVal = data.paciente.uid === paciente.uid;
          }
        }
        if (especialista && returnVal) {
          if (typeof especialista === 'string') {
            returnVal = data.especialista.nombre
              .toLowerCase()
              .includes(especialista.toLowerCase());
          } else {
            returnVal = data.especialista.uid === especialista.uid;
          }
        }

        if (especialidad && returnVal) {
          if (typeof especialidad === 'string') {
            returnVal = data.especialidad.nombre
              .toLowerCase()
              .includes(especialidad.toLowerCase());
          } else {
            returnVal = data.especialidad.nombre === especialidad.nombre;
          }
        }

        if (returnVal) {
          turnos.push({ id, ...data });
        }
      });
    });

    //await this.timeout(800);

    return turnos;
  }

  timeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  UpdateTurno(id: string, data: Turno) {
    const collection = this.bd.collection<Turno>(TURNOS_PATH);
    return collection.doc(id).update(data);
  }

  UpdateUsuario(id: string, data: Especialista) {
    const collection = this.bd.collection<Especialista>(USURARIOS_PATH);
    return collection
      .doc(id)
      .update(data)
      .then((r) => {
        this.authService.GetUserData(id);
        alert('Datos actualizados');
      });
  }

  CreateTurno(turno: Turno) {
    const collection = this.bd.collection<Turno>(TURNOS_PATH);
    return collection.add(turno).then((res) => {
      if (this.authService.isValidAdmin) {
        this.router.navigate(['admin-turnos']);
      } else {
        this.router.navigate(['paciente-turnos']);
      }
    });
  }

  GetUsuarios() {
    const collection = this.bd.collection<
      Especialista | Paciente | Administrador
    >(USURARIOS_PATH);
    return collection.valueChanges();
  }

  CreateEspecialidad(especialidad: Especialidad) {
    const collection = this.bd.collection(ESPECIALIDAD_PATH);
    return collection.add(especialidad);
  }

  async UploadImage(file: any, name: string) {
    const ref = this.afStorage.ref(name);
    return ref.put(file);
  }
}
