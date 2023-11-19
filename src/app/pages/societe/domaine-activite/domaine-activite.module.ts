import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DomaineActiviteRoutingModule } from './domaine-activite-routing.module';
import { DomaineActiviteAddComponent } from './domaine-activite-add/domaine-activite-add.component';
import { DomaineActiviteEditComponent } from './domaine-activite-edit/domaine-activite-edit.component';
import { DomaineActiviteListComponent } from './domaine-activite-list/domaine-activite-list.component';
import { DomaineActiviteDetailComponent } from './domaine-activite-detail/domaine-activite-detail.component';
import {NgbdListSortableHeader} from "./domaine-activite-list/list-sortable.directive";
import {ModalModule} from "ngx-bootstrap/modal";
import {PaginationModule} from "ngx-bootstrap/pagination";
import {SharedModule} from "../../../shared/shared.module";
import {UiSwitchModule} from "ngx-ui-switch";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    DomaineActiviteAddComponent,
    DomaineActiviteEditComponent,
    DomaineActiviteListComponent,
    DomaineActiviteDetailComponent,
    NgbdListSortableHeader,
  ],
  imports: [
    CommonModule,
    DomaineActiviteRoutingModule,
    ModalModule,
    PaginationModule,
    SharedModule,
    UiSwitchModule,
    ReactiveFormsModule
  ]
})
export class DomaineActiviteModule { }
