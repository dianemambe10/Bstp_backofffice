import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ListModel } from './list.model';
import { Observable } from 'rxjs';

import { NgbdListSortableHeader, listSortEvent } from './list-sortable.directive';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ListService } from './list.service';
import { DecimalPipe } from '@angular/common';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { ActivatedRoute, Router } from '@angular/router';
import {UserProfileService} from "../../../../core/services/user.service";
import {ToastrService} from "ngx-toastr";
import { ListServiceBuyer } from './list.serviceBuyer';
import { ListServiceSupplier } from './list.serviceSupplier';



@Component({
  selector: 'app-utilisateur-list',
  templateUrl: './utilisateur-list.component.html',
  styleUrls: ['./utilisateur-list.component.scss'],
  providers: [ListService, ListServiceBuyer, ListServiceSupplier,  DecimalPipe]
})
export class UtilisateurListComponent {


  // bread crumb items
  breadCrumbItems!: Array<{}>;
  listForm!: UntypedFormGroup;
  submitted = false;

  listData!: any;
  masterSelected!: boolean;
  files: File[] = [];

  menu = '';
  sousmenu = '';
  categorie = '';

  // Table data
  CoursesList!: Observable<ListModel[]>;
  total: Observable<number>;

  @ViewChildren(NgbdListSortableHeader) headers!: QueryList<NgbdListSortableHeader>;
  @ViewChild('addCourse', { static: false }) addCourse?: ModalDirective;
  @ViewChild('deleteRecordModal', { static: false }) deleteRecordModal?: ModalDirective;

  deleteID: any;

  constructor(
                public service: ListService,
                public serviceBuyer: ListServiceBuyer,
                public serviceSupplier: ListServiceSupplier,
                private formBuilder: UntypedFormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                private userProfileService : UserProfileService,
                public toastService: ToastrService,

                ) {
    this.CoursesList = service.countries$;
    
    this.total = service.total$;
  }

  ngOnInit(): void {


    this.route.data.subscribe((data) =>{
      const {menu, sousmenu, categorie} = data
      this.menu = menu
      this.sousmenu = sousmenu
      this.categorie = categorie
    /*  if(this.categorie == "fournisseurs"){
        this.CoursesList = this.serviceSupplier.countries$;
    
        this.total = this.serviceSupplier.total$;
      }
      if(this.categorie == "acheteurs"){
        this.CoursesList = this.serviceBuyer.countries$;
        this.total = this.serviceBuyer.total$;
      }*/
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
      this.router.navigate(['../access/utilisateur/nouveau/categorie' , this.categorie]);

  }


  /**
   *
   *  Edit a new buyer


   */

  editUser(e: Event, id: any){
    e.preventDefault()
      this.router.navigate(['../access/utilisateur/edit', id]);
  }
  detailUser(e: Event, id: any){
    e.preventDefault()
      this.router.navigate(['../access/utilisateur/details', id]);
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
  onSort({ column, direction }: listSortEvent) {0
6    // resetting other headers
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
  removeUser(id: any) {
    this.deleteID = id
    this.deleteRecordModal?.show()
  }

  confirmDelete() {

    if (this.deleteID) {
      this.userProfileService.delete(this.deleteID).subscribe({
        next: value => {
          this.service.users = this.service.users.filter((product: any) => {
            return this.deleteID != product.slug;
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
      this.service.users = this.service.user.filter((product: any) => {
        return !this.checkedValGet.includes(product.id);
      });
    }
    this.deleteRecordModal?.hide()
    this.masterSelected = false;
  }


}
