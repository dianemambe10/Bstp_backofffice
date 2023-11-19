import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcheteurListComponent } from './acheteur-list.component';

describe('AcheteurListComponent', () => {
  let component: AcheteurListComponent;
  let fixture: ComponentFixture<AcheteurListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcheteurListComponent]
    });
    fixture = TestBed.createComponent(AcheteurListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
