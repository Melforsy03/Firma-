import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AplicacioneComponent } from './aplicacione.component';

describe('AplicacioneComponent', () => {
  let component: AplicacioneComponent;
  let fixture: ComponentFixture<AplicacioneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AplicacioneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AplicacioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
