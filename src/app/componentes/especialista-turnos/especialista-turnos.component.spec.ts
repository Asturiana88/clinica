import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialistaTurnosComponent } from './especialista-turnos.component';

describe('EspecialistaTurnosComponent', () => {
  let component: EspecialistaTurnosComponent;
  let fixture: ComponentFixture<EspecialistaTurnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EspecialistaTurnosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EspecialistaTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
