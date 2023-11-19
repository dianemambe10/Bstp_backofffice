import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcheteurGridComponent } from './acheteur-grid.component';

describe('AcheteurGridComponent', () => {
  let component: AcheteurGridComponent;
  let fixture: ComponentFixture<AcheteurGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcheteurGridComponent]
    });
    fixture = TestBed.createComponent(AcheteurGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
