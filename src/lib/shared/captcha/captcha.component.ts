import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.scss'],
})
export class CaptchaComponent implements OnInit {
  @Output() resolve = new EventEmitter<boolean>(false);

  constructor() {}

  ngOnInit(): void {}

  onInteract() {
    this.resolve.emit(true);
  }
}
