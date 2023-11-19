import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcheteurEditComponent } from './acheteur-edit.component';

describe('AcheteurEditComponent', () => {
  let component: AcheteurEditComponent;
  let fixture: ComponentFixture<AcheteurEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcheteurEditComponent]
    });
    fixture = TestBed.createComponent(AcheteurEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
