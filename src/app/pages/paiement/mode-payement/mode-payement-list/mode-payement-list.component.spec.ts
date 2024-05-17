import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModePayementListComponent } from './mode-payement-list.component';

describe('TypeDemandeListComponent', () => {
  let component: ModePayementListComponent;
  let fixture: ComponentFixture<ModePayementListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModePayementListComponent]
    });
    fixture = TestBed.createComponent(ModePayementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
