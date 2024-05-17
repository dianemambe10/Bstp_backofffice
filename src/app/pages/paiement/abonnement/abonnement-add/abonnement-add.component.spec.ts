/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AbonnementAddComponent } from './abonnement-add.component';

describe('AbonnementAddComponent', () => {
  let component: AbonnementAddComponent;
  let fixture: ComponentFixture<AbonnementAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbonnementAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbonnementAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
