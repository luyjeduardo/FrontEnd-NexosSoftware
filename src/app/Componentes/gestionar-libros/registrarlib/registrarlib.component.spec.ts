import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarlibComponent } from './registrarlib.component';

describe('RegistrarlibComponent', () => {
  let component: RegistrarlibComponent;
  let fixture: ComponentFixture<RegistrarlibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarlibComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarlibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
