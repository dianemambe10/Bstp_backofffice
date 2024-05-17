/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AbonnementListComponent } from './abonnement-list.component';

describe('AbonnementListComponent', () => {
  let component: AbonnementListComponent;
  let fixture: ComponentFixture<AbonnementListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbonnementListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbonnementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
