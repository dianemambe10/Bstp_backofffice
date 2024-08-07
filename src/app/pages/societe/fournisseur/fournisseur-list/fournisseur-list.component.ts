import {Component, ElementRef, QueryList, ViewChild, ViewChildren} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ListModel } from './list.model';
import { Observable } from 'rxjs';

import { NgbdListSortableHeader, listSortEvent } from './list-sortable.directive';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ListService } from './list.service';
import {DecimalPipe, formatDate} from '@angular/common';
import { courseList } from './data';
import Swal from 'sweetalert2';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { ActivatedRoute, Router } from '@angular/router';
import {FournisseurService} from "../../../../core/services/fournisseur.service";
import {ToastrService} from "ngx-toastr";
import {Entreprise} from "../../../../core/models/entreprise.model";
import {Region} from "../../../../core/models/region.model";
import {Prefecture} from "../../../../core/models/prefecture.model";
import {Commune} from "../../../../core/models/commune.model";
import {HelpsService} from "../../../../core/services/helps.service";
import {DomaineActiviteService} from "../../../../core/services/domaine-activite.service";
import {DomaineActivite} from "../../../../core/models/domaine-activite.model";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";



@Component({
  selector: 'app-fournisseur-list',
  templateUrl: './fournisseur-list.component.html',
  styleUrls: ['./fournisseur-list.component.scss'],
  providers: [ListService, DecimalPipe]
})
export class FournisseurListComponent {


  // bread crumb items
  breadCrumbItems!: Array<{}>;
  filterForm!: UntypedFormGroup;
  submitted = false;

  listData!: any;
  masterSelected!: boolean;
  files: File[] = [];

  menu = '';
  sousmenu = '';

  imageURL: string = './assets/images/defaultlogo.jpg';

  // Table data
  CoursesList!: Observable<ListModel[]>;
  total: Observable<number>;

  regionList = [] as Region[];
  prefectureList = [] as Prefecture[];
  prefectureRegion = [] as Prefecture[];
  communeList = [] as Commune[];
  communePrefecture = [] as Commune[];
  regionDefault = "";
  prefectureDefault = "";
  communeDefault = "";
  domaineActivites = [] as DomaineActivite[];
  enregistrement = "date"

  colorTheme: any = 'theme-blue';
  bsConfig?: Partial<BsDatepickerConfig>;

  @ViewChildren(NgbdListSortableHeader) headers!: QueryList<NgbdListSortableHeader>;
  @ViewChild('addCourse', { static: false }) addCourse?: ModalDirective;
  @ViewChild('deleteRecordModal', { static: false }) deleteRecordModal?: ModalDirective;
  @ViewChild('toggleButton') toggleButton!: ElementRef;

  deleteID: any;
  data = {}


  constructor(
                public service: ListService,
                private formBuilder: UntypedFormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                private helperService: HelpsService,
                private domaineActiviteService: DomaineActiviteService,
                private fournisseurService : FournisseurService,
                public toastService: ToastrService,
                ) {
    this.CoursesList = service.countries$;
    this.total = service.total$;
  }

  ngOnInit(): void {

    this.bsConfig = Object.assign({}, {containerClass: this.colorTheme, showWeekNumbers: false});

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



    this.createForm()

    this.helperService.getRegion().subscribe((data: Region[]) => this.regionList = data)

    this.helperService.getPrefecture().subscribe((data: Prefecture[]) => this.prefectureList = data)

    this.helperService.getCommmune().subscribe((data: Commune[]) => this.communeList = data)

    this.domaineActiviteService.getData().subscribe(data => this.domaineActivites = data)

  }


  createForm() {
    this.filterForm = this.formBuilder.group({
      date: ['', []],
      enregistrement: ['date', []],
      startDate: ['', []],
      endDate: ['', []],
      region: ['', []],
      prefecture: ['', []],
      commune: ['', []],
      domaine_activite: ['', []]
    });

    this.initFilter()
  }

  initFilter() {
    this.filterForm.controls['startDate'].setValue(formatDate(new Date(), 'MM/dd/yyyy', "en-US"))
    this.filterForm.controls['endDate'].setValue(formatDate(new Date(), 'MM/dd/yyyy', "en-US"))

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
   *
   *  Edit a new buyer


   */

  detailSuplyer(e: Event, id: any){
   e.preventDefault()
   this.router.navigate(['../societe/fournisseurs/detail', id]);
  }
  editSuplyer(e: Event, id: any){
   e.preventDefault()
   this.router.navigate(['../societe/fournisseurs/edit', id]);
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
  removeSuplyer(id: any) {
    this.deleteID = id
    this.deleteRecordModal?.show()
  }

  confirmDelete() {
    if (this.deleteID) {
      this.fournisseurService.delete(this.deleteID).subscribe({
        next: (res)=> {

          this.toastService.success('La suppression d\' un domaine d\'activité a été effectué avec success', 'Succèss',{
            timeOut: 3000,
          })
          this.service.suppliers = this.service.suppliers.filter((supplyer: any) => {
            return this.deleteID != supplyer.slug;
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
      this.service.suppliers = this.service.suppliers.filter((supplyer: any) => {
        return !this.checkedValGet.includes(supplyer.id);
      });
    }
    this.deleteRecordModal?.hide()
    this.masterSelected = false;
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
          case 'region':
            this.data = {...this.data, ...{region: value}}
            break;
          case 'prefecture':
            this.data = {...this.data, ...{prefecture: value}}
            break;
          case 'commune':
            this.data = {...this.data, ...{commune: value}}
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

    this.service.suppliers = this.listData.filter((buyer: any) => {
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
          case 'region':
            if (buyer[key] != this.data[key as keyof typeof this.data]) return false
            break;
          case 'prefecture':
            if (buyer[key] != this.data[key as keyof typeof this.data]) return false
            break;
          case 'commune':
            if (buyer[key].id != this.data[key as keyof typeof this.data]) return false
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
    this.service.suppliers = this.service.suppliers_back

  }

  onRegionSelect(e: any, type: any = 0) {
    let k = 0
    type ? k = e : k = e.target.value
    this.prefectureRegion = this.prefectureList.filter((prefecture) => prefecture.region!.id == k)

  }

  onPrefectureSelect(e: any, type: any = 0) {
    let k = 0
    type ? k = e : k = e.target.value
    this.communePrefecture = this.communeList.filter(commune => commune.prefecture!.id == k)


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

  onDate(e: any) {
    // e.preventDefault()

    //this.filterForm.controls['date'].patchValue(formatDate(this.filterForm.get('date')?.value,'yyyy-MM-dd',"en-US"))
  }

  onDebut(e: any) {
    e.preventDefault()
  }

  onFin(e: any) {
    e.preventDefault()
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
