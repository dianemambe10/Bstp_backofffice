import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcheteurAddComponent } from './acheteur-add.component';

describe('AcheteurAddComponent', () => {
  let component: AcheteurAddComponent;
  let fixture: ComponentFixture<AcheteurAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcheteurAddComponent]
    });
    fixture = TestBed.createComponent(AcheteurAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
