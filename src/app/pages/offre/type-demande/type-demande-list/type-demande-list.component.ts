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
import {UserProfileService} from "../../../../core/services/user.service";
import {ToastrService} from "ngx-toastr";
import {TypeDemandeService} from "../../../../core/services/type-demande.service";


@Component({
  selector: 'app-type-demande-list',
  templateUrl: './type-demande-list.component.html',
  styleUrls: ['./type-demande-list.component.scss'],
  providers: [ListService, DecimalPipe]
})
export class TypeDemandeListComponent {

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
                 private typeDemandeService : TypeDemandeService,
                 public toastService: ToastrService,) {
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
       document.getElementById('elmLoader')?.classList.add('d-none')
     }, 1000)

     /**
      * Form Validation
      */
     this.listForm = this.formBuilder.group({
       id: [''],
       img: [''],
       name: [''],
       category: ['', [Validators.required]],
       instructor: ['', [Validators.required]],
       lessons: ['', [Validators.required]],
       students: ['', [Validators.required]],
       duration: ['', [Validators.required]],
       fees: ['', [Validators.required]],
       status: ['', [Validators.required]]
     });
   }

   /**
    *
    *  Add a new buyer


    */

   addBuyer(e: Event){

     e.preventDefault()
       this.router.navigate(['../offre/type-demande/nouveau']);

   }


   /**
    *
    *  Edit a new buyer


    */

   editBuyer(e: Event, id: any){

     e.preventDefault()
       this.router.navigate(['../offre/type-demande/edit', id]);

   }

   //  Filter Offcanvas Set
   openEnd() {
     document.getElementById('courseFilters')?.classList.add('show')
     document.querySelector('.backdrop3')?.classList.add('show')
   }

   closeoffcanvas() {
     document.getElementById('courseFilters')?.classList.remove('show')
     document.querySelector('.backdrop3')?.classList.remove('show')
   }

   // File Upload
   public dropzoneConfig: DropzoneConfigInterface = {
     clickable: true,
     addRemoveLinks: true,
     previewsContainer: false,
   };

   uploadedFiles: any[] = [];

   // File Upload
   imageURL: any;
   onUploadSuccess(event: any) {
     setTimeout(() => {
       this.uploadedFiles.push(event[0]);
       this.listForm.controls['img'].setValue(event[0].dataURL);
     }, 100);
   }

   // File Remove
   removeFile(event: any) {
     this.uploadedFiles.splice(this.uploadedFiles.indexOf(event), 1);
   }

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

   // Edit Data
   editList(id: any) {
     this.addCourse?.show()
     var modaltitle = document.querySelector('.modal-title') as HTMLAreaElement
     modaltitle.innerHTML = 'Edit Product'
     var modalbtn = document.getElementById('add-btn') as HTMLAreaElement
     modalbtn.innerHTML = 'Update'

     var editData = this.listData[id]

     this.uploadedFiles.push({ 'dataURL': editData.img, 'name': editData.img_alt, 'size': 1024, });

     this.listForm.patchValue(this.listData[id]);
   }

   /**
   * Save product
   */

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

       this.typeDemandeService.delete(this.deleteID).subscribe({
         next: value => {
           this.service.typeDemandes = this.service.typeDemandes.filter((product: any) => {
             return this.deleteID != product.id;
           });
           this.deleteID = ''
           this.toastService.success('L\'utilisateur a été supprimé avec success', 'Succèss',{
             timeOut: 3000,
           })
         },
         error(err: any){

         }
       })


     } else {
       this.service.typeDemandes = this.service.typeDemandes.filter((product: any) => {
         return !this.checkedValGet.includes(product.id);
       });
     }
     this.deleteRecordModal?.hide()
     this.masterSelected = false;
   }

}
