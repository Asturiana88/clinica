import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/lib/servicios/autenticacion.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  authService: AuthService;
  isLoading = this.auth.isLoading;

  idioma = localStorage.getItem('clinica-idioma') || 'es';

  constructor(
    private auth: AuthService,
    translate: TranslateModule,
    private translations: TranslateService
  ) {
    this.authService = auth;
  }

  ngOnInit(): void {}

  onTranslationsChange() {
    this.translations.setDefaultLang(this.idioma);
    localStorage.setItem('clinica-idioma', this.idioma);
  }
}
