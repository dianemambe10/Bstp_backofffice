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


import { DemandeRoutingModule } from './demande-routing.module';
import { DemandeAddComponent } from './demande-add/demande-add.component';
import { DemandeEditComponent } from './demande-edit/demande-edit.component';
import { DemandeDetailComponent } from './demande-detail/demande-detail.component';
import { DemandeListComponent } from './demande-list/demande-list.component';
import { DemandeGridComponent } from './demande-grid/demande-grid.component';
import { NgbdListSortableHeader } from './demande-list/list-sortable.directive';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {NgxSliderModule} from "ngx-slider-v2";
import {NgArrayPipesModule} from "ngx-pipes";
import { TextFormatPipe } from 'src/app/core/helpers/pipe/text-format.pipe';


@NgModule({
  declarations: [
    NgbdListSortableHeader,
    DemandeAddComponent,
    DemandeEditComponent,
    DemandeDetailComponent,
    DemandeListComponent,
    DemandeGridComponent
  ],
    imports: [
        CommonModule,
        DemandeRoutingModule,
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
        RxReactiveFormsModule,
        BsDatepickerModule,
        TooltipModule,
        NgxSliderModule,
        NgArrayPipesModule
    ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DemandeModule { }
