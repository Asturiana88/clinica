import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './autenticacion.service';

const CAPTCHA = 'captcha';
@Injectable({
  providedIn: 'root',
})
export class CaptchaEnableService {
  constructor(private bd: AngularFirestore, private authService: AuthService) {}

  SetCaptcha(state: boolean) {
    this.bd
      .collection<{ activo: boolean }>(CAPTCHA)
      .doc(CAPTCHA)
      .update({ activo: state });
  }

  GetCaptcha() {
    return this.bd
      .collection<{ activo: boolean }>(CAPTCHA)
      .doc(CAPTCHA)
      .valueChanges();
  }
}
