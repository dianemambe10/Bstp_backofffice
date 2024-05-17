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

import { AcheteurRoutingModule } from './acheteur-routing.module';
import { AcheteurAddComponent } from './acheteur-add/acheteur-add.component';
import { AcheteurEditComponent } from './acheteur-edit/acheteur-edit.component';
import { AcheteurListComponent } from './acheteur-list/acheteur-list.component';
import { AcheteurDetailComponent } from './acheteur-detail/acheteur-detail.component';
import { NgbdListSortableHeader } from './acheteur-list/list-sortable.directive';
import { AcheteurGridComponent } from './acheteur-grid/acheteur-grid.component';
import { AcheteurStepOneComponent } from './acheteur-step-one/acheteur-step-one.component';
import { AcheteurStepTwoComponent } from './acheteur-step-two/acheteur-step-two.component';
import { AcheteurStepEndComponent } from './acheteur-step-end/acheteur-step-end.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import {UtilisateurModule} from "../../access/utilisateur/utilisateur.module";
import {RxReactiveFormsModule} from "@rxweb/reactive-form-validators";
import {NgxMaskDirective, provideNgxMask} from "ngx-mask";




@NgModule({
  declarations: [
    NgbdListSortableHeader,
    AcheteurAddComponent,
    AcheteurEditComponent,
    AcheteurListComponent,
    AcheteurDetailComponent,
    AcheteurGridComponent,
    AcheteurStepOneComponent,
    AcheteurStepTwoComponent,
    AcheteurStepEndComponent
  ],
    imports: [

        AcheteurRoutingModule,
        CommonModule,
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
        LeafletModule,
        UtilisateurModule,
        RxReactiveFormsModule,
        NgxMaskDirective
    ],
  providers: [
    provideNgxMask(),
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AcheteurModule { }
