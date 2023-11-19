import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratEditComponent } from './contrat-edit.component';

describe('ContratEditComponent', () => {
  let component: ContratEditComponent;
  let fixture: ComponentFixture<ContratEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContratEditComponent]
    });
    fixture = TestBed.createComponent(ContratEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
