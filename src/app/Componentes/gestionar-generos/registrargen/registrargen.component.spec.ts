import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrargenComponent } from './registrargen.component';

describe('RegistrargenComponent', () => {
  let component: RegistrargenComponent;
  let fixture: ComponentFixture<RegistrargenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrargenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrargenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
