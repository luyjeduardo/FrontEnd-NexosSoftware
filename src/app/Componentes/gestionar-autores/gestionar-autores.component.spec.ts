import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarAutoresComponent } from './gestionar-autores.component';

describe('GestionarAutoresComponent', () => {
  let component: GestionarAutoresComponent;
  let fixture: ComponentFixture<GestionarAutoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionarAutoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarAutoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
