import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarGenerosComponent } from './gestionar-generos.component';

describe('GestionarGenerosComponent', () => {
  let component: GestionarGenerosComponent;
  let fixture: ComponentFixture<GestionarGenerosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionarGenerosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarGenerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
