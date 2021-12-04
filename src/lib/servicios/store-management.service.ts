import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { Administrador } from '../clases/administrador';
import { Especialidad } from '../clases/especialidad';
import { Especialista } from '../clases/especialista';
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

  GetEspecialidades() {
    const collection = this.bd.collection<Especialidad>(ESPECIALIDAD_PATH);
    return collection.valueChanges();
  }

  GetTurnos(props: {
    fecha?: string;
    hora?: string;
    paciente?: Paciente;
    especialidad?: Especialidad;
    especialista?: Especialista;
  }) {
    const { fecha, hora, paciente, especialidad, especialista } = props || {};
    const collection = this.bd.collection<Turno>(TURNOS_PATH);
    const turnos: Turno[] = [];

    collection.get().forEach((actions) => {
      return actions.docs.map((a) => {
        const data = a.data() as Turno;
        const id = a.id;

        let returnVal = true;
        if (fecha && returnVal) {
          returnVal = data.fecha == fecha;
        }
        if (hora && returnVal) {
          returnVal = data.hora == hora;
        }
        if (paciente && returnVal) {
          returnVal = data.paciente.uid == paciente.uid;
        }
        if (especialista && returnVal) {
          returnVal = data.especialista.uid == especialista.uid;
        }
        if (especialidad && returnVal) {
          returnVal = data.especialidad.nombre == especialidad.nombre;
        }

        if (returnVal) turnos.push({ id, ...data });
      });
    });

    return turnos;
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
    return collection
      .add(turno)
      .then((res) => this.router.navigate(['paciente-turnos']));
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

  uploadProgress = 0;
  async UploadImage(file: any, name: string) {
    const ref = this.afStorage.ref(name);
    return ref.put(file);
  }
}
