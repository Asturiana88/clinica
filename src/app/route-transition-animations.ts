import {
  trigger,
  transition,
  style,
  query,
  group,
  animate,
  animateChild,
} from '@angular/animations';

export const routeTransitionAnimations = trigger('triggerName', [
  // Desvanece
  transition('* => Login,* => Registrarse,* => Home', [
    style({ position: 'relative' }),
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          overflow: 'hidden',
          top: 0,
          right: 0,
          width: '100%',
        }),
      ],
      { optional: true }
    ),

    query(':enter', [style({ right: '-100%', opacity: 0 })], {
      optional: true,
    }),
    query(':leave', animateChild(), { optional: true }),
    group([
      query(
        ':leave',
        [animate('1s ease-out', style({ right: '100%', opacity: 0 }))],
        { optional: true }
      ),
      query(
        ':enter',
        [animate('1s ease-out', style({ right: '0%', opacity: 1 }))],
        { optional: true }
      ),
    ]),
    query(':enter', animateChild(), { optional: true }),
  ]),

  // Se expande
  transition('* => TrunosAdmin, * => TrunosEspecialista, * => TurnosPaciente', [
    style({ position: 'relative' }),
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          overflow: 'hidden',
          top: 0,
          right: 0,
          width: '100%',
        }),
      ],
      { optional: true }
    ),

    query(':enter', [style({ top: '-100%', opacity: 0 })], { optional: true }),
    query(':leave', animateChild(), { optional: true }),
    group([
      query(
        ':leave',
        [animate('1s ease-out', style({ transform: 'scale(10)', opacity: 0 }))],
        { optional: true }
      ),
      query(
        ':enter',
        [animate('1s ease-out', style({ top: '0%', opacity: 1 }))],
        { optional: true }
      ),
    ]),
    query(':enter', animateChild(), { optional: true }),
  ]),

  // Rota
  transition('* => PacientePerfil, * => EspecialistaPerfil', [
    style({ position: 'relative' }),
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          overflow: 'hidden',
          top: 0,
          right: 0,
          width: '100%',
        }),
      ],
      { optional: true }
    ),

    query(':enter', [style({ top: '-100%', opacity: 0 })], { optional: true }),
    query(':leave', animateChild(), { optional: true }),
    group([
      query(
        ':leave',
        [
          animate(
            '1s ease-out',
            style({ transform: 'rotate(360deg)', opacity: 0 })
          ),
        ],
        { optional: true }
      ),
      query(
        ':enter',
        [animate('1s ease-out', style({ top: '0%', opacity: 1 }))],
        { optional: true }
      ),
    ]),
    query(':enter', animateChild(), { optional: true }),
  ]),

  // Inclina
  transition('* => SolicitarTurno, * => EspecialistaPacientesAtendidos', [
    style({ position: 'relative' }),
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          overflow: 'hidden',
          top: 0,
          right: 0,
          width: '100%',
        }),
      ],
      { optional: true }
    ),

    query(':enter', [style({ top: '-100%', opacity: 0 })], { optional: true }),
    query(':leave', animateChild(), { optional: true }),
    group([
      query(
        ':leave',
        [
          animate(
            '1s ease-out',
            style({ transform: 'skew(30deg, 20deg)', opacity: 0 })
          ),
        ],
        { optional: true }
      ),
      query(
        ':enter',
        [animate('1s ease-out', style({ top: '0%', opacity: 1 }))],
        { optional: true }
      ),
    ]),
    query(':enter', animateChild(), { optional: true }),
  ]),

  // Achica
  transition('* => RegistrarAdmin, * => AdminUserList', [
    style({ position: 'relative' }),
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          overflow: 'hidden',
          top: 0,
          right: 0,
          width: '100%',
        }),
      ],
      { optional: true }
    ),

    query(':enter', [style({ top: '-100%', opacity: 0 })], { optional: true }),
    query(':leave', animateChild(), { optional: true }),
    group([
      query(
        ':leave',
        [animate('1s ease-out', style({ transform: 'scale(.1)', opacity: 0 }))],
        { optional: true }
      ),
      query(
        ':enter',
        [animate('1s ease-out', style({ top: '0%', opacity: 1 }))],
        { optional: true }
      ),
    ]),
    query(':enter', animateChild(), { optional: true }),
  ]),

  // Se desplaza abajo
  transition('* => Settings, * => Informes', [
    style({ position: 'relative' }),
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          overflow: 'hidden',
          top: 0,
          right: 0,
          width: '100%',
        }),
      ],
      { optional: true }
    ),

    query(':enter', [style({ top: '-100%', opacity: 0 })], { optional: true }),
    query(':leave', animateChild(), { optional: true }),
    group([
      query(
        ':leave',
        [animate('1s ease-out', style({ top: '100vh', opacity: 0 }))],
        { optional: true }
      ),
      query(
        ':enter',
        [animate('1s ease-out', style({ top: '0%', opacity: 1 }))],
        { optional: true }
      ),
    ]),
    query(':enter', animateChild(), { optional: true }),
  ]),
]);
