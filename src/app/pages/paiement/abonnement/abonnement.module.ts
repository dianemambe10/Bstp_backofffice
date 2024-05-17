import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AbonnementRoutingModule } from './abonnement-routing.module';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgStepperModule } from 'angular-ng-stepper';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { RatingModule } from 'ngx-bootstrap/rating';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { DropzoneModule, DROPZONE_CONFIG, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { SimplebarAngularModule } from 'simplebar-angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { TypeDemandeRoutingModule } from '../mode-payement/mode-payement-routing.module';
import { AbonnementAddComponent } from './abonnement-add/abonnement-add.component';
import { AbonnementDetailComponent } from './abonnement-detail/abonnement-detail.component';
import { AbonnementEditComponent } from './abonnement-edit/abonnement-edit.component';
import { AbonnementListComponent } from './abonnement-list/abonnement-list.component';
import { NgbdListSortableHeader } from './abonnement-list/list-sortable.directive';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgArrayPipesModule } from 'ngx-pipes';
import { NgxSliderModule } from 'ngx-slider-v2';
import { CountUpModule } from 'ngx-countup';


// Component

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
   url: 'https://httpbin.org/post',
   maxFilesize: 50,
   acceptedFiles: 'image/*'
 };


@NgModule({
  declarations: [
    NgbdListSortableHeader,
    AbonnementAddComponent,
    AbonnementEditComponent,
    AbonnementListComponent,
    AbonnementDetailComponent
  ],
  imports: [
    CommonModule,
    AbonnementRoutingModule,
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
    NgArrayPipesModule,
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
export class AbonnementModule { }
