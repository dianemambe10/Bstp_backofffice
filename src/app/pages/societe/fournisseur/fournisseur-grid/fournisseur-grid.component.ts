import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { GridService } from './grid.service';
import { DecimalPipe } from '@angular/common';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GridModel } from './grid.model';

import Swal from 'sweetalert2';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { ActivatedRoute, Router } from '@angular/router';
import {BuyerService} from "../../../../core/services/buyer.service";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-fournisseur-grid',
  templateUrl: './fournisseur-grid.component.html',
  styleUrls: ['./fournisseur-grid.component.scss'],
  providers: [GridService, DecimalPipe]
})
export class FournisseurGridComponent {


  // bread crumb items
  breadCrumbItems!: Array<{}>;
  listForm!: UntypedFormGroup;
  submitted = false;

  menu = '';
  sousmenu = '';

  listData!: any;
  masterSelected!: boolean;
  files: File[] = [];
  // Table data
  CoursesList!: Observable<GridModel[]>;
  total: Observable<number>;

  @ViewChild('addCourse', { static: false }) addCourse?: ModalDirective;
  @ViewChild('deleteRecordModal', { static: false }) deleteRecordModal?: ModalDirective;

  deleteID: any;

  imageURL: string = './assets/images/defaultlogo.jpg';
  avatarURL: string = './assets/images/users/user-dummy-img.jpg';
  constructor(
    public service: GridService,
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private  buyerService: BuyerService,
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
      document.getElementById('elmLoader')?.classList.add('d-none')
    }, 1000)

    /**
     * Form Validation
     */
    this.listForm = this.formBuilder.group({
      id: [''],
      name: [''],
      img: [''],
      category: ['', [Validators.required]],
      instructor: ['', [Validators.required]],
      lessons: ['', [Validators.required]],
      students: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      fees: ['', [Validators.required]],
      coursestatus: ['', [Validators.required]]
    });
  }

  /**
   *
   *  Add a new buyer


   */

  addBuyer(e: Event){

    e.preventDefault()
    this.router.navigate(['../societe/fournisseurs/nouveau']);

  }


  /**
   * Returns form
   */
  get form() {
    return this.listForm.controls;
  }

  // File Upload
  public dropzoneConfig: DropzoneConfigInterface = {
    clickable: true,
    addRemoveLinks: true,
    previewsContainer: false,
  };

  uploadedFiles: any[] = [];

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

  // Edit Data
  editList(id: any) {
    this.addCourse?.show()
    var modaltitle = document.querySelector('.modal-title') as HTMLAreaElement
    modaltitle.innerHTML = 'Edit Product'
    var modalbtn = document.getElementById('add-btn') as HTMLAreaElement
    modalbtn.innerHTML = 'Update'

    var editData = this.listData[id]

    this.uploadedFiles.push({ 'dataURL': editData.img, 'name': editData.img_alt, 'size': 1024, });

    this.listForm.controls['id'].setValue(editData.id);
    this.listForm.controls['name'].setValue(editData.name);
    this.listForm.controls['category'].setValue(editData.category);
    this.listForm.controls['instructor'].setValue(editData.instructor);
    this.listForm.controls['lessons'].setValue(editData.lessons);
    this.listForm.controls['students'].setValue(editData.students);
    this.listForm.controls['duration'].setValue(editData.duration);
    this.listForm.controls['fees'].setValue(editData.fees);
    this.listForm.controls['coursestatus'].setValue(editData.coursestatus);
    this.listForm.controls['img'].setValue(editData.img);
  }

  editBuyer(e: Event, id: any){
    e.preventDefault()
    this.router.navigate(['../societe/fournisseurs/edit', id]);
  }
  gridBuyer(e: Event){
    e.preventDefault()
    this.router.navigate(['../societe/fournisseurs/grid']);
  }
  listBuyer(e: Event){
    e.preventDefault()
    this.router.navigate(['../societe/fournisseurs']);
  }
  detailBuyer(e: Event, id: any){
    e.preventDefault()
    this.router.navigate(['../societe/fournisseurs/details', id]);
  }

  // Delete Product
  removeItem(id: any) {
    this.deleteID = id
    this.deleteRecordModal?.show()
  }



  confirmDelete() {
    if (this.deleteID) {
      this.buyerService.delete(this.deleteID).subscribe({
        next: (res)=> {

          this.toastService.success('La suppression d\' un domaine d\'activité a été effectué avec success', 'Succèss',{
            timeOut: 3000,
          })
          this.service.products = this.service.products.filter((product: any) => {
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

    }
    this.deleteRecordModal?.hide()
    this.masterSelected = false;
  }




  openEnd() {
    document.getElementById('courseFilters')?.classList.add('show')
    document.querySelector('.backdrop3')?.classList.add('show')
  }
}
