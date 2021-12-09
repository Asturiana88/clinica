import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { Administrador } from '../clases/administrador';
import { Especialidad } from '../clases/especialidad';
import { Especialista } from '../clases/especialista';
import { HistoriaClinica } from '../clases/historia-clinica';
import { Log } from '../clases/log';
import { Paciente } from '../clases/paciente';
import { Turno } from '../clases/turno';
import { Usuario } from '../clases/usuario';
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
    private afStorage: AngularFireStorage,
    private http: HttpClient
  ) {}

  uploadProgress = 0;

  GetEspecialidades() {
    const collection = this.bd.collection<Especialidad>(ESPECIALIDAD_PATH);
    return collection.valueChanges();
  }

  // ESTA DE ESTA MANERA PORQUE PODEMOS OBTENER YA TODOS LOS TURNOS FILTRADOS
  // EN VEZ DE USAR valueChanges USE get PARA PODER TENER EL ID DE CADA TURNO
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
        this.authService.GetUserData(id, true);
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

  crearUsuariosFake() {
    Array(5)
      .fill('')
      .forEach(async (i) => {
        const API = '/api';
        const data: any = await this.http.get(API).toPromise();
        const userData = data.results[0];

        const chance = Math.random();
        const user = new Usuario();
        user.nombre = userData.name.first;
        user.apellido = userData.name.last;
        user.email = userData.email;
        user.dni = userData.cell.replaceAll('-', '');
        user.fotoPerfil = userData.picture.thumbnail;
        user.uid = 'FAKE-' + userData.login.uuid;
        // 80% chance de ser paciente
        if (chance < 0.8) {
          user.rol = 'paciente';
        } else {
          user.rol = 'especialista';
        }
        this.bd
          .collection('users')
          .doc(user.uid)
          .set(JSON.parse(JSON.stringify(user)))
          .then((val: any) => {
            console.log('AA');
          });
      });
  }

  substractDays(days: number) {
    const result = new Date();
    result.setDate(result.getDate() - days);
    return result;
  }

  crearLogsFake() {
    this.GetUsuarios().subscribe((users) => {
      Array(30)
        .fill('')
        .forEach((_, i) => {
          const cantidadRandomDeLogs = Math.floor(Math.random() * 100);
          const fecha = this.substractDays(i).toISOString();
          Array(cantidadRandomDeLogs)
            .fill('')
            .forEach(async (_) => {
              const user = users[Math.floor(Math.random() * users.length)];
              await this.bd.collection<Log>('logIngresos').add({
                usuario: { ...user },
                fecha,
              });
            });
        });
    });
  }

  crearTurnosFake() {
    const turnoEstados = [
      'pendiente',
      'finalizado',
      'aceptado',
      'cancelado',
      'rechazado',
    ];
    this.GetEspecialidades().subscribe((especialidades) => {
      this.GetUsuarios().subscribe((users) => {
        const especialistas: Especialista[] = [];
        const pacientes: Paciente[] = [];
        for (let index = 0; index < users.length; index++) {
          const user = users[index];
          if (user.rol === 'especialista') {
            especialistas.push(user as Especialista);
          } else if (user.rol === 'paciente') {
            pacientes.push(user as Paciente);
          }
        }
        Array(30)
          .fill('')
          .forEach((_, i) => {
            const cantidadRandom = Math.floor(1 + Math.random() * 20);
            const fecha = this.substractDays(i - 15).toISOString();
            Array(cantidadRandom)
              .fill('')
              .forEach(async (_) => {
                const paciente =
                  pacientes[Math.floor(Math.random() * pacientes.length)];
                const especialista =
                  especialistas[
                    Math.floor(Math.random() * especialistas.length)
                  ];

                const turno = new Turno();
                turno.fecha = fecha;
                turno.hora = '08:00hs';
                turno.paciente = paciente;
                turno.especialista = especialista;
                turno.calificacion = {
                  comentario: 'Fake comentario',
                  prefiereSerContactadoPorCelular: true,
                  probabilidadDeRecomendacion: Math.floor(Math.random() * 100),
                  puntuacionAtencion: Math.floor(Math.random() * 10),
                  solucionoSuProblema: Math.random() > 0.5,
                };
                turno.comentario = 'Fake comentario';
                turno.resena = 'Fake resena';
                turno.encuesta = 'Fake encuesta?';
                turno.especialidad =
                  especialidades[
                    Math.floor(Math.random() * especialidades.length)
                  ];
                turno.estado = turnoEstados[
                  Math.floor(Math.random() * especialidades.length)
                ] as
                  | 'pendiente'
                  | 'finalizado'
                  | 'aceptado'
                  | 'cancelado'
                  | 'rechazado';

                turno.historiaClinica = {
                  altura: 100 + Math.random() * 105,
                  peso: 30 + Math.random() * 70,
                  presion: 70 + Math.random() * 70,
                  temperatura: 35 + Math.random() * 7,
                };

                this.CreateTurno({ ...turno });
              });
          });
      });
    });
  }
}
