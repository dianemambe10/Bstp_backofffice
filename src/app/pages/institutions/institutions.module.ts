import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstitutionsRoutingModule } from './institutions-routing.module';
import { InstitutsModule } from './instituts/instituts.module';
import { TypeInstitutsModule } from './type-instituts/type-instituts.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InstitutionsRoutingModule,
    SharedModule,
    InstitutsModule,
    TypeInstitutsModule
  ]
})
export class InstitutionsModule { }
