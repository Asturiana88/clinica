import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialistaPerfilComponent } from './especialista-perfil.component';

describe('EspecialistaPerfilComponent', () => {
  let component: EspecialistaPerfilComponent;
  let fixture: ComponentFixture<EspecialistaPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EspecialistaPerfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EspecialistaPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
