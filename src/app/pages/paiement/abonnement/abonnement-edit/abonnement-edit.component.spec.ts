/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AbonnementEditComponent } from './abonnement-edit.component';

describe('AbonnementEditComponent', () => {
  let component: AbonnementEditComponent;
  let fixture: ComponentFixture<AbonnementEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbonnementEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbonnementEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
