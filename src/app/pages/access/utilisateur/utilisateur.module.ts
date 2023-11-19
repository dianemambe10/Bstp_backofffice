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


import { UtilisateurRoutingModule } from './utilisateur-routing.module';
import { UtilisateurAddComponent } from './utilisateur-add/utilisateur-add.component';
import { UtilisateurListComponent } from './utilisateur-list/utilisateur-list.component';
import { UtilisateurDetailComponent } from './utilisateur-detail/utilisateur-detail.component';
import { UtilisateurEditComponent } from './utilisateur-edit/utilisateur-edit.component';
import { UtilisateurGridComponent } from './utilisateur-grid/utilisateur-grid.component';
import { NgbdListSortableHeader } from './utilisateur-list/list-sortable.directive';
import { UtilisateurProfilSettingsComponent } from './utilisateur-profil-settings/utilisateur-profil-settings.component';
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
import {ProgressbarModule} from "ngx-bootstrap/progressbar";


@NgModule({
  declarations: [
    NgbdListSortableHeader,
    UtilisateurAddComponent,
    UtilisateurListComponent,
    UtilisateurDetailComponent,
    UtilisateurEditComponent,
    UtilisateurGridComponent,
    UtilisateurProfilSettingsComponent

  ],
  imports: [
    CommonModule,
    UtilisateurRoutingModule,
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
    BsDatepickerModule,
    ProgressbarModule
  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UtilisateurModule { }
