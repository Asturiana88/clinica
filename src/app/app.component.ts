import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../lib/servicios/autenticacion.service';
import { routeTransitionAnimations } from './route-transition-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeTransitionAnimations],
})
export class AppComponent {
  title = 'clinica';
  loading = true;

  constructor(private authService: AuthService, translate: TranslateService) {
    this.authService.isLoading.subscribe((val) => {
      this.loading = val;
    });

    const storedLang = localStorage.getItem('clinica-idioma');
    translate.setDefaultLang(storedLang || 'es');
  }

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animationState']
    );
  }
}
