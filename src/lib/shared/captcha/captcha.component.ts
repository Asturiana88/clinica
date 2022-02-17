import { Component, EventEmitter, AfterViewInit, Output } from '@angular/core';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.scss'],
})
export class CaptchaComponent implements AfterViewInit {
  @Output() resolve = new EventEmitter<boolean>(false);

  captchaRandom = '';
  captchaInput = '';
  error = false;
  success = false;

  constructor() {}

  ngAfterViewInit() {
    this.crearCaptcha();
  }

  crearCaptcha() {
    this.captchaRandom = this.randomWord(6);
    const canvas = document.getElementById(
      'captchaCanvas'
    ) as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    ctx.font = '30px Arial';
    ctx.clearRect(0, 0, 150, 80);
    ctx.strokeText(this.captchaRandom, 10, 50);
  }

  onConfirm() {
    console.log(this.captchaRandom);
    console.log(this.captchaInput);
    if (this.captchaRandom == this.captchaInput) {
      this.success = true;
      return this.resolve.emit(true);
    }
    this.error = true;
    this.crearCaptcha();
  }

  onInteract() {
    this.resolve.emit(true);
  }

  randomWord(length: number) {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
