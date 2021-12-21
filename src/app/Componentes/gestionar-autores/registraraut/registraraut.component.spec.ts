import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarautComponent } from './registraraut.component';

describe('RegistrarautComponent', () => {
  let component: RegistrarautComponent;
  let fixture: ComponentFixture<RegistrarautComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarautComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarautComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
