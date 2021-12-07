import { Component, OnInit } from '@angular/core';
import { CaptchaEnableService } from 'src/lib/servicios/captcha-enable.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  status = this.captcha.GetCaptcha();
  constructor(private captcha: CaptchaEnableService) {}

  ngOnInit(): void {}

  updateCaptcha(status: boolean) {
    this.captcha.SetCaptcha(status);
  }
}
