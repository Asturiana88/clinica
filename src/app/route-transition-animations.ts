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
  transition('9 => *, 10 => *, 11 => *', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100%',
      }),
    ]),

    query(':enter', [style({ right: '-100%', opacity: 0 })]),
    query(':leave', animateChild()),
    group([
      query(':leave', [
        animate('1s ease-out', style({ right: '100%', opacity: 0 })),
      ]),
      query(':enter', [
        animate('1s ease-out', style({ right: '0%', opacity: 1 })),
      ]),
    ]),
    query(':enter', animateChild()),
  ]),
  transition('* => *', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100%',
      }),
    ]),

    query(':enter', [style({ top: '-100%', opacity: 0 })]),
    query(':leave', animateChild()),
    group([
      query(':leave', [
        animate('1s ease-out', style({ top: '100%', opacity: 0 })),
      ]),
      query(':enter', [
        animate('1s ease-out', style({ top: '0%', opacity: 1 })),
      ]),
    ]),
    query(':enter', animateChild()),
  ]),
]);
