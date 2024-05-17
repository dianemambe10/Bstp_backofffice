import { DecimalPipe, formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { NgbdListSortableHeader, listSortEvent } from './list-sortable.directive';
import { ListModel } from './list.model';
import { ListService } from './list.service';
import { AbonnementService } from 'src/app/core/services/abonnement.service';
import { ListingModel } from '../abonnement-add/grid.model';
import { listinglistcard } from '../abonnement-add/data';

@Component({
  selector: 'app-abonnement-list',
  templateUrl: './abonnement-list.component.html',
  styleUrls: ['./abonnement-list.component.css'],
  providers: [ListService, DecimalPipe]
})
export class AbonnementListComponent implements OnInit {
 // bread crumb items
 breadCrumbItems!: Array<{}>;
 listForm!: UntypedFormGroup;
 filterForm!: UntypedFormGroup;
 submitted = false;

 listData!: any;
 masterSelected!: boolean;
 files: File[] = [];
 data = {}
 menu = '';
 sousmenu = '';

 // Table data
 CoursesList!: Observable<ListModel[]>;
 total: Observable<number>;
 enregistrement = "date"

 colorTheme: any = 'theme-blue';
 bsConfig?: Partial<BsDatepickerConfig>;

 @ViewChildren(NgbdListSortableHeader) headers!: QueryList<NgbdListSortableHeader>;
 @ViewChild('addCourse', {static: false}) addCourse?: ModalDirective;
 @ViewChild('deleteRecordModal', {static: false}) deleteRecordModal?: ModalDirective;
 @ViewChild('toggleButton') toggleButton!: ElementRef;

 deleteID: any;
 // File Upload
 public dropzoneConfig: DropzoneConfigInterface = {
   clickable: true,
   addRemoveLinks: true,
   previewsContainer: false,
 };
 uploadedFiles: any[] = [];
 // File Upload
 imageURL: any;
 checkedValGet: any[] = [];

 listingcards!: ListingModel[];

 

 constructor(
   public service: ListService,
   private formBuilder: UntypedFormBuilder,
   private route: ActivatedRoute,
   private router: Router,
   private abonnementService: AbonnementService,
   public toastService: ToastrService,) {
   this.CoursesList = service.countries$;
   this.total = service.total$;
 }

 ngOnInit(): void {

   this.bsConfig = Object.assign({}, {containerClass: this.colorTheme, showWeekNumbers: false});
   this.route.data.subscribe((data) => {
     const {menu, sousmenu} = data
     this.menu = menu
     this.sousmenu = sousmenu
   })


   /**
    * BreadCrumb
    */
   this.breadCrumbItems = [
     {label: this.menu, active: true},
     {label: this.sousmenu, active: true}
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


   this.filterForm = this.formBuilder.group({
     date: ['', []],
     enregistrement: ['date', []],
     startDate: ['', []],
     endDate: ['', []],
     domaine_activite: ['', []]
   });

   // Fetch Data
 this.listingcards = listinglistcard;
 }

 /**
  *
  *  Add a new buyer


  */

 addBuyer(e: Event) {

   e.preventDefault()
   this.router.navigate(['../abonnement/paiement/nouveau']);

 }

 /**
  *
  *  Edit a new buyer


  */

 editItem(e: Event, id: any) {
   e.preventDefault()
   this.router.navigate(['../abonnement/paiement/edit', id]);
 }

 datailItem(e: Event, id: any) {
   e.preventDefault()
   this.router.navigate(['../abonnement/paiement/details', id]);
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
 onSort({column, direction}: listSortEvent) {
   // resetting other headers
   this.headers.forEach(header => {
     if (header.listsortable !== column) {
       header.direction = '';
     }
   });

   this.service.sortColumn = column;
   this.service.sortDirection = direction;
 }


 /**
  * Save product
  */

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

     this.abonnementService.delete(this.deleteID).subscribe({
       next: value => {
         this.service.abonnements = this.service.abonnements.filter((product: any) => {
           return this.deleteID != product.slug;
         });
         this.deleteID = ''
         this.toastService.success('L\'utilisateur a été supprimé avec success', 'Succèss', {
           timeOut: 3000,
         })
       },
       error(err: any) {

       }
     })


   } else {
     this.service.abonnements = this.service.abonnements.filter((product: any) => {
       return !this.checkedValGet.includes(product.id);
     });
   }
   this.deleteRecordModal?.hide()
   this.masterSelected = false;
 }

 onRestrictedTypeChanged(e: any) {
   if (e.target.value == 'date') {
     this.enregistrement = "date"
     this.filterForm.controls['startDate'].patchValue('')
     this.filterForm.controls['endDate'].patchValue('')
   } else {
     this.enregistrement = "periode"
     this.filterForm.controls['date'].patchValue('')
   }
 }

 validateFilter() {
   if (this.filterForm.controls['startDate'].value != '')
     this.filterForm.controls['startDate'].patchValue(formatDate(this.filterForm.controls['startDate'].value, 'yyyy-MM-dd', "en-US"))
   if (this.filterForm.controls['endDate'].value != '')
     this.filterForm.controls['endDate'].patchValue(formatDate(this.filterForm.controls['endDate'].value, 'yyyy-MM-dd', "en-US"))
   if (this.filterForm.controls['date'].value != '')
     this.filterForm.controls['date'].patchValue(formatDate(this.filterForm.controls['date'].value, 'yyyy-MM-dd', "en-US"))

   Object.entries(this.filterForm.value).forEach(([key, value]) => {

     let k: { [key: string]: any } = {}

     if (value != '') {
       switch (key) {
         case 'date':
           this.data = {...this.data, ...{date: value}}
           break;
         case 'startDate':
           // let yr = formatDate(value, 'yyyy-MM-dd',"en-US")
           this.data = {...this.data, ...{startDate: value}}
           break;
         case 'endDate':
           this.data = {...this.data, ...{endDate: value}}
           break;

         case 'domaine_activite':
           this.data = {...this.data, ...{domaine_activite: value}}
           break;
         default:
           break;

       }
     }

   })

   let keysFilter = Object.keys(this.data)

   this.service.abonnements = this.listData.filter((buyer: any) => {
     for (let key in this.data) {
       switch (key) {
         case 'date':
           if (buyer[key] != this.data[key as keyof typeof this.data]) return false
           break;
         case 'startDate':
           if (buyer.registration_date <= this.data[key as keyof typeof this.data]) return false
           break;
         case 'endDate':
           if (buyer.registration_date >= this.data[key as keyof typeof this.data]) return false
           break;
         case 'domaine_activite':
           if (buyer[key] != this.data[key as keyof typeof this.data]) return false
           break;
         default:
           break;
       }

     }
     return true
   })
   this.closeoffcanvas()

 }


 listAll = () => {
   this.service.abonnements = this.service.abonnements_back

 }

 togglebtn(event: any) {

   var followbtn = event.target.closest('.custom-toggle') as any;
   if (followbtn.classList.contains("active")) {
     followbtn.classList.remove('active')
     this.listAll()

   } else {
     followbtn.classList.add('active')
     this.openEnd()
   }
 }

 resetFilter(event: any) {
   event.preventDefault()
   this.closeoffcanvas()
   this.toggleButton.nativeElement.click
 }


}
