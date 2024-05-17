import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// component
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { TextFormatPipe } from '../core/helpers/pipe/text-format.pipe';

@NgModule({
  declarations: [
    ImageUploadComponent,
    BreadcrumbsComponent,
    TextFormatPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TextFormatPipe,
    ImageUploadComponent, 
    BreadcrumbsComponent]
})
export class SharedModule { }
