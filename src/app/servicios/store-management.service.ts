import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AuthService } from './autenticacion.service';

export const ESPECIALIDAD_PATH = 'especialidad'

@Injectable({
  providedIn: 'root'
})
export class StoreManagementService {

  constructor(private bd: AngularFirestore, private authService: AuthService) {}

  GetEspecialidades(){
    const collection = this.bd.collection<{especialidad:string}>(ESPECIALIDAD_PATH)
    return collection.valueChanges()
  }

  CreateEspecialidad(especialidad:string){
    const collection = this.bd.collection(ESPECIALIDAD_PATH)
    return collection.add({especialidad})
  }

}
