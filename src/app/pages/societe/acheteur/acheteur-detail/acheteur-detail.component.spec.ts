import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcheteurDetailComponent } from './acheteur-detail.component';

describe('AcheteurDetailComponent', () => {
  let component: AcheteurDetailComponent;
  let fixture: ComponentFixture<AcheteurDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcheteurDetailComponent]
    });
    fixture = TestBed.createComponent(AcheteurDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
