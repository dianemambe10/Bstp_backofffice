import { CommonModule } from '@angular/common';



import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Page Route
import { SharedModule } from 'src/app/shared/shared.module';

// Select Droup down
import { NgSelectModule } from '@ng-select/ng-select';

//Wizard
import { CdkStepperModule } from '@angular/cdk/stepper';
import { NgStepperModule } from 'angular-ng-stepper';

// Ck Editer
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

// Simplebar
import { SimplebarAngularModule } from 'simplebar-angular';

// Drop Zone
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { RatingModule } from 'ngx-bootstrap/rating';

// Component

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
   url: 'https://httpbin.org/post',
   maxFilesize: 50,
   acceptedFiles: 'image/*'
 };

import { FournisseurRoutingModule } from './fournisseur-routing.module';
import { FournisseurAddComponent } from './fournisseur-add/fournisseur-add.component';
import { FournisseurEditComponent } from './fournisseur-edit/fournisseur-edit.component';
import { FournisseurListComponent } from './fournisseur-list/fournisseur-list.component';
import { FournisseurDetailComponent } from './fournisseur-detail/fournisseur-detail.component';
import { FournisseurStepOneComponent } from './fournisseur-step-one/fournisseur-step-one.component';
import { FournisseurStepTwoComponent } from './fournisseur-step-two/fournisseur-step-two.component';
import { FournisseurStepEndComponent } from './fournisseur-step-end/fournisseur-step-end.component';
import { NgbdListSortableHeader } from './fournisseur-list/list-sortable.directive';
import { FournisseurGridComponent } from './fournisseur-grid/fournisseur-grid.component';
import { FournisseurStepThreeComponent } from './fournisseur-step-three/fournisseur-step-three.component';
import {
  FournisseurStepActionnaireComponent
} from "./fournisseur-step-actionnaire/fournisseur-step-actionnaire.component";
import {FournisseurStepReferenceComponent} from "./fournisseur-step-reference/fournisseur-step-reference.component";
import {FlatpickrModule} from "angularx-flatpickr";
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";


@NgModule({
  declarations: [
    NgbdListSortableHeader,
    FournisseurAddComponent,
    FournisseurEditComponent,
    FournisseurListComponent,
    FournisseurDetailComponent,
    FournisseurStepOneComponent,
    FournisseurStepTwoComponent,
    FournisseurStepActionnaireComponent,
    FournisseurStepReferenceComponent,
    FournisseurStepEndComponent,
    FournisseurGridComponent,
    FournisseurStepThreeComponent
  ],
  imports: [
    CommonModule,
    FournisseurRoutingModule,
    SharedModule,
    BsDropdownModule.forRoot(),
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    AccordionModule.forRoot(),
    TabsModule.forRoot(),
    SimplebarAngularModule,
    CKEditorModule,
    DropzoneModule,
    NgStepperModule,
    CdkStepperModule,
    RatingModule,
    NgSelectModule,
    FlatpickrModule,
    BsDatepickerModule
  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FournisseurModule { }
