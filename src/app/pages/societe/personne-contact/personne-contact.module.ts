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

import { PersonneContactRoutingModule } from './personne-contact-routing.module';
import { PersonneContactAddComponent } from './personne-contact-add/personne-contact-add.component';
import { PersonneContactEditComponent } from './personne-contact-edit/personne-contact-edit.component';
import { PersonneContactListComponent } from './personne-contact-list/personne-contact-list.component';
import { PersonneContactDetailComponent } from './personne-contact-detail/personne-contact-detail.component';
import { NgbdListSortableHeader } from './personne-contact-list/list-sortable.directive';


@NgModule({
  declarations: [
    NgbdListSortableHeader,
    PersonneContactAddComponent,
    PersonneContactEditComponent,
    PersonneContactListComponent,
    PersonneContactDetailComponent
  ],
  imports: [
    CommonModule,
    PersonneContactRoutingModule,
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
    NgSelectModule
  ]
})
export class PersonneContactModule { }
