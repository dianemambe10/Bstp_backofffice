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
import { TypeSocieteRoutingModule } from './type-societe-routing.module';
import { TypeSociteAddComponent } from './type-socite-add/type-socite-add.component';
import { TypeSocieteAddComponent } from './type-societe-add/type-societe-add.component';
import { TypeSocieteEditComponent } from './type-societe-edit/type-societe-edit.component';
import { TypeSocieteListComponent } from './type-societe-list/type-societe-list.component';
import { TypeSocieteDetailComponent } from './type-societe-detail/type-societe-detail.component';
import { NgbdListSortableHeader } from './type-societe-list/list-sortable.directive';


@NgModule({
  declarations: [
    NgbdListSortableHeader,
    TypeSociteAddComponent,
    TypeSocieteAddComponent,
    TypeSocieteEditComponent,
    TypeSocieteListComponent,
    TypeSocieteDetailComponent
  ],
  imports: [
    CommonModule,
    TypeSocieteRoutingModule,
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
export class TypeSocieteModule { }
