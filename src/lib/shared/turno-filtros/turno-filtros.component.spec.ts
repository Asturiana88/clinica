import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoFiltrosComponent } from './turno-filtros.component';

describe('TurnoFiltrosComponent', () => {
  let component: TurnoFiltrosComponent;
  let fixture: ComponentFixture<TurnoFiltrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnoFiltrosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnoFiltrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
