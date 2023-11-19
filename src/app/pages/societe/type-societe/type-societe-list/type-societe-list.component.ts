import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ListModel } from './list.model';
import { Observable } from 'rxjs';

import { NgbdListSortableHeader, listSortEvent } from './list-sortable.directive';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ListService } from './list.service';
import { DecimalPipe } from '@angular/common';
import { courseList } from './data';
import Swal from 'sweetalert2';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeSocieteService } from 'src/app/core/services/type-societe.service';
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-type-societe-list',
  templateUrl: './type-societe-list.component.html',
  styleUrls: ['./type-societe-list.component.scss'],
  providers: [ListService, DecimalPipe]
})
export class TypeSocieteListComponent {

   // bread crumb items
   breadCrumbItems!: Array<{}>;
   listForm!: UntypedFormGroup;
   submitted = false;

   listData!: any;
   masterSelected!: boolean;
   files: File[] = [];

   menu = '';
   sousmenu = '';

   // Table data
   CoursesList!: Observable<ListModel[]>;
   total: Observable<number>;

   @ViewChildren(NgbdListSortableHeader) headers!: QueryList<NgbdListSortableHeader>;
   @ViewChild('addCourse', { static: false }) addCourse?: ModalDirective;
   @ViewChild('deleteRecordModal', { static: false }) deleteRecordModal?: ModalDirective;

   deleteID: any;

   constructor(
                 public service: ListService,
                 private formBuilder: UntypedFormBuilder,
                 private route: ActivatedRoute,
                 private router: Router,
                 public typeSocieteService: TypeSocieteService,
                 public toastService: ToastrService,
                ) {
     this.CoursesList = service.countries$;
     this.total = service.total$;
   }

   ngOnInit(): void {


     this.route.data.subscribe((data) =>{
       const {menu, sousmenu} = data
       this.menu = menu
       this.sousmenu = sousmenu
     })


     /**
      * BreadCrumb
      */
     this.breadCrumbItems = [
       { label: this.menu, active: true },
       { label: this.sousmenu, active: true }
     ];

     // Fetch Data
     setTimeout(() => {
       this.CoursesList.subscribe(x => {
         this.listData = Object.assign([], x);
       });
       //this.typeSocieteService.getData().subscribe()
       document.getElementById('elmLoader')?.classList.add('d-none')
     }, 1000)


   }

   /**
    *
    *  Add a new buyer


    */

   addBuyer(e: Event){

     e.preventDefault()
       this.router.navigate(['../societe/type-societes/nouveau']);

   }


   /**
    *
    *  Edit a new buyer


    */

   editBuyer(e: Event, id: any){

     e.preventDefault()
       this.router.navigate(['../societe/type-societes/edit', id]);

   }



   // File Upload
   public dropzoneConfig: DropzoneConfigInterface = {
     clickable: true,
     addRemoveLinks: true,
     previewsContainer: false,
   };

   uploadedFiles: any[] = [];


   // Sort Data
   onSort({ column, direction }: listSortEvent) {
     // resetting other headers
     this.headers.forEach(header => {
       if (header.listsortable !== column) {
         header.direction = '';
       }
     });

     this.service.sortColumn = column;
     this.service.sortDirection = direction;
   }




   checkedValGet: any[] = [];
   // The master checkbox will check/ uncheck all items
   checkUncheckAll(ev: any) {
     this.listData.forEach((x: { state: any; }) => x.state = ev.target.checked)
     var checkedVal: any[] = [];
     var result
     for (var i = 0; i < this.listData.length; i++) {
       if (this.listData[i].state == true) {
         result = this.listData[i].id;
         checkedVal.push(result);
       }
     }
     this.checkedValGet = checkedVal
     checkedVal.length > 0 ? document.getElementById("remove-actions")?.classList.remove('d-none') : document.getElementById("remove-actions")?.classList.add('d-none');
   }

   // Select Checkbox value Get
   onCheckboxChange(e: any) {
     var checkedVal: any[] = [];
     var result
     for (var i = 0; i < this.listData.length; i++) {
       if (this.listData[i].state == true) {
         result = this.listData[i].id;
         checkedVal.push(result);
       }
     }
     this.checkedValGet = checkedVal
     checkedVal.length > 0 ? document.getElementById("remove-actions")?.classList.remove('d-none') : document.getElementById("remove-actions")?.classList.add('d-none');
   }

   // Delete Product
   removeItem(id: any) {
     this.deleteID = id
     this.deleteRecordModal?.show()
   }

  confirmDelete() {
    if (this.deleteID) {
      this.typeSocieteService.delete(this.deleteID).subscribe({
        next: (res)=> {

          this.toastService.success('La suppression d\' un domaine d\'activité a été effectué avec success', 'Succèss',{
            timeOut: 3000,
          })
          this.service.typesocietes = this.service.typesocietes.filter((product: any) => {
            return this.deleteID != product.id;
          });
          this.deleteID = ''


        },
        error:(err)=>{
          this.toastService.error('Une erreur survenue', 'Erreur',{
            timeOut: 3000,
          })

        }
      })

    } else {
      this.service.typesocietes = this.service.typesocietes.filter((product: any) => {
        return !this.checkedValGet.includes(product.id);
      });
    }
    this.deleteRecordModal?.hide()
    this.masterSelected = false;
  }


}
