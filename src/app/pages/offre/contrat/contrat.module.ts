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

import { ContratRoutingModule } from './contrat-routing.module';
import { ContratAddComponent } from './contrat-add/contrat-add.component';
import { ContratEditComponent } from './contrat-edit/contrat-edit.component';
import { ContratListComponent} from './contrat-list/contrat-list.component';
import { ContratDetailComponent } from './contrat-detail/contrat-detail.component';
import { NgbdListSortableHeader } from './contrat-list/list-sortable.directive';
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
import {NgArrayPipesModule} from "ngx-pipes";
import {NgxSliderModule} from "ngx-slider-v2";
import {RxReactiveFormsModule} from "@rxweb/reactive-form-validators";
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import { CountUpModule } from 'ngx-countup';
import { TextFormatPipe } from 'src/app/core/helpers/pipe/text-format.pipe';


@NgModule({
  declarations: [
    NgbdListSortableHeader,
    ContratAddComponent,
    ContratEditComponent,
    ContratListComponent,
    ContratDetailComponent
  ],
  imports: [
    CommonModule,
    ContratRoutingModule,
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
    NgArrayPipesModule,
    NgxSliderModule,
    RxReactiveFormsModule,
    LeafletModule,
    CountUpModule,
  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ContratModule { }
