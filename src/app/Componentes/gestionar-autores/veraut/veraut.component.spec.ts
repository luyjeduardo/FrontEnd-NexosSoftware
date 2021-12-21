import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerautComponent } from './veraut.component';

describe('VerautComponent', () => {
  let component: VerautComponent;
  let fixture: ComponentFixture<VerautComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerautComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerautComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
