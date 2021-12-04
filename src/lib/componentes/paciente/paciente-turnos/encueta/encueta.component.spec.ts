import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuetaComponent } from './encueta.component';

describe('EncuetaComponent', () => {
  let component: EncuetaComponent;
  let fixture: ComponentFixture<EncuetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EncuetaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EncuetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
