import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Demandeur } from 'src/app/core/models/demandeur.model';
import { Entreprise } from 'src/app/core/models/entreprise.model';
import { FournisseurStepOneComponent } from '../fournisseur-step-one/fournisseur-step-one.component';
import { FournisseurStepTwoComponent } from '../fournisseur-step-two/fournisseur-step-two.component';
import {Documents} from "../../../../core/models/document.model";
import {format_d} from "echarts/types/dist/shared";
import {UserProfileService} from "../../../../core/services/user.service";
import {ToastrService} from "ngx-toastr";
import {User} from "../../../../core/models/auth.models";
import {FournisseurService} from "../../../../core/services/fournisseur.service";

import Swal from 'sweetalert2';
import {BsModalRef, BsModalService, ModalDirective} from "ngx-bootstrap/modal";
import {Region} from "../../../../core/models/region.model";
import {Prefecture} from "../../../../core/models/prefecture.model";
import {Commune} from "../../../../core/models/commune.model";
import {DataService} from "../../../../core/services/data.service";
import {HelpsService} from "../../../../core/services/helps.service";
import {TypeSocieteService} from "../../../../core/services/type-societe.service";
import {DomaineActiviteService} from "../../../../core/services/domaine-activite.service";
import {chatMessagesData} from "../../../forms/advance/data";
import {
  FournisseurStepActionnaireComponent
} from "../fournisseur-step-actionnaire/fournisseur-step-actionnaire.component";
import {Actionnaire} from "../../../../core/models/actionnaire.model";
import {errorValidation} from "../../../../core/helpers/utility";
import {ReferenceCommericiale} from "../../../../core/models/referenceCommericiale.model";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";

@Component({
  selector: 'app-fournisseur-add',
  templateUrl: './fournisseur-add.component.html',
  styleUrls: ['./fournisseur-add.component.scss']
})
export class FournisseurAddComponent {


  @ViewChild(FournisseurStepOneComponent) stepOne!: FournisseurStepOneComponent
  @ViewChild(FournisseurStepTwoComponent) stepTwo!: FournisseurStepTwoComponent
  @ViewChild(FournisseurStepActionnaireComponent) actionnaireComponent!: FournisseurStepActionnaireComponent

  @ViewChild('successContent', { static: false }) successContent?: ModalDirective;
  @ViewChild('addActionnaire', { static: false }) addActionnaire?: ModalDirective;
  @ViewChild('addReference', { static: false }) addReference?: ModalDirective;
  @ViewChild('deleteRecordModal', { static: false }) deleteRecordModal?: ModalDirective;


  demandeur!: any;
  entreprise!: Entreprise;
  entrepriseInfo!: Entreprise;
  entrepriseDocument!: Entreprise;

  document!: any

  submitted = false;
  currentFile?: File;
  menu = '';
  sousmenu = '';
  idDelete: number = -1

  modalAjoutTitle = "Ajout d'un actionnaire"
  actsave = "ajout"
  type= 'act'


  actionnaireArray = [] as Actionnaire[]
  referenceArray = [] as ReferenceCommericiale[]


    // bread crumb items
  breadCrumbItems!: Array<{}>;


  modalRef?: BsModalRef;

  color: any;

  colorTheme: any = 'theme-blue';
  bsConfig?: Partial<BsDatepickerConfig>;



  public formActionnaire!: UntypedFormGroup;
  public formReference!: UntypedFormGroup;
  listForm!: UntypedFormGroup;


  public Default = chatMessagesData;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userProfileService : UserProfileService,
    public toastService: ToastrService,
    private fournisseurService : FournisseurService,
    private dataService: DataService,
    private  helperService: HelpsService,
    private typeSocieteService: TypeSocieteService,
    private domaineActiviteService: DomaineActiviteService,
  ) {}



  ngOnInit(): void {

    this.createForm()

    this.route.data.subscribe((data) =>{
      const {menu, sousmenu} = data
      this.menu = menu
      this.sousmenu = sousmenu
    })

    this.helperService.getRegion().subscribe((data: Region[]) =>{
      this.dataService.setDataRegionList$(data)
    })

    this.helperService.getPrefecture().subscribe((data: Prefecture[]) =>{
      this.dataService.setDataPrefectureList$(data)
    })

    this.helperService.getCommmune().subscribe((data: Commune[]) =>{
      this.dataService.setDataCommuneList$(data)
    })

    this.domaineActiviteService.getData().subscribe((data )=>{
      this.dataService.setDataDomaineList$(data)
    })

    this.typeSocieteService.getData().subscribe(data =>{
      this.dataService.setDataTypeList$(data)
    })

    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: this.menu, active: true },
      { label: this.sousmenu, active: true }
    ];

    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme, showWeekNumbers: false });

  }


  change(event: any) {


    }

    formEmitStep1(d: User){
      this.demandeur = d
      console.log(this.demandeur)
    }

    formEmitStep2(e: Entreprise){
     this.entrepriseInfo = e
     console.log(this.entreprise)
    }

    formEmitStep3(d: Entreprise){

      this.entrepriseDocument  = d

    }



  /**
   * Stet actionnaire model
   */

  civilites: Array<{ id: string, name: string }> = [
    { id: 'F', name: "Femme" },
    { id: 'M', name: "Homme" },
  ];
  get f() { return this.formActionnaire.controls; }
  get ff() { return this.formReference.controls; }


  createForm(){

    this.formActionnaire = this.fb.group({
      id: [''],
      last_name: ['Mohamed', [Validators.required]],
      first_name: ['Diane', [Validators.required]],
      date_of_birth: ['1990/02/02', [Validators.required]],
      gender: ['M', [Validators.required]],
      phone_number: ['628492536', []],
      email: ['dianemambe@gmail.com', [Validators.required, Validators.email]],
      role_dans_lentreprise: ['PDG', []],
      username: ['', []],
      part_action: ['62', [Validators.required]],
      nationalite: ['', []]
    });

    this.formReference = this.fb.group({
      id: [''],
      company_name: ['Mohamed', [Validators.required]],
      contact_full_name: ['Diane', [Validators.required]],
      contact_phone_number: ['628492536', []],
      contact_designation: ['dg', []],
      contact_email: ['dianemambe@gmail.com', [ Validators.email]],
      contact_approx_amount: ['1000000', []],
      reference: ['PDG', []],
      supplier: ['PDG', []],
      attachement: ['', []],
      doc: ['', []],
      contact_approx_amount_currency: ['FG', []]
    });
  }

  modalAddEmit(e: any){

    this.modalAjoutTitle = "Ajout d'un actionnaire"
    this.actsave = "ajout"
    this.formActionnaire.reset()
    this.submitted = false
    this.addActionnaire?.show()
  }

  modalEditEmit(e: any){
    this.submitted = false
    this.modalAjoutTitle = "Editon d'un actionnaire"
    this.actsave = "edit"
    let actionnaire = this.actionnaireArray.at(e)
    console.log(actionnaire)
    this.formActionnaire.controls['last_name'].setValue(actionnaire?.last_name)
    this.formActionnaire.controls['first_name'].setValue(actionnaire?.first_name)
    this.formActionnaire.controls['gender'].setValue(actionnaire?.gender)
    this.formActionnaire.controls['date_of_birth'].setValue(actionnaire?.date_of_birth)
    this.formActionnaire.controls['phone_number'].setValue(actionnaire?.phone_number)
    this.formActionnaire.controls['email'].setValue(actionnaire?.email)
    this.formActionnaire.controls['part_action'].setValue(actionnaire?.part_action)
    this.formActionnaire.controls['nationalite'].setValue(actionnaire?.nationalite)
    this.formActionnaire.controls['role_dans_lentreprise'].setValue(actionnaire?.role_dans_lentreprise)
    this.addActionnaire?.show()
  }
  modalDeleteEmit(e: any){
    this.type = "act"
    this.idDelete = e
    this.deleteRecordModal?.show()
  }

  saveProduct(e: any) {

    console.log(this.formActionnaire.value)

    if(e == "ajout"){
      if(this.formActionnaire.valid){
        this.actionnaireArray.push(this.formActionnaire.value)
        this.dataService.setActionnaireList$(this.actionnaireArray)
        this.formActionnaire.reset()
        //errorValidation(this.formActionnaire.controls)
        this.submitted = false
        this.addActionnaire?.hide()
      }else{
        this.submitted = true
      }
    }else if(e== "edit"){

    }
  }

  confirmDelete(e: any, type: any) {
    e.preventDefault()
    if(type == "act"){
      this.actionnaireArray.splice(this.idDelete, 1)
    }else if(type == "ref"){
      this.referenceArray.splice(this.idDelete, 1)
    }
    this.deleteRecordModal?.hide()
  }

  /**
   * Reference commerciale
   * @param e
   */

  modalAddEmitReference(e: any){
    this.formReference.reset()
    this.submitted = false
    this.modalAjoutTitle = "Ajout d'une référence Commerciale"
    this.actsave = "ajout"
    this.addReference?.show()
  }

  modalEditEmitReference(e: any){
    this.idDelete = e
    this.submitted = false
    this.modalAjoutTitle = "Editon d'une référence Commerciale"
    this.actsave = "edit"
    let reference = this.referenceArray.at(e)
    console.log(reference)
    this.formReference.controls['reference'].setValue(reference?.reference)
    this.formReference.controls['contact_approx_amount_currency'].setValue(reference?.contact_approx_amount_currency)
    this.formReference.controls['contact_designation'].setValue(reference?.contact_designation)
    this.formReference.controls['contact_email'].setValue(reference?.contact_email)
    this.formReference.controls['contact_full_name'].setValue(reference?.contact_full_name)
    this.formReference.controls['contact_phone_number'].setValue(reference?.contact_phone_number)
    this.formReference.controls['contact_designation'].setValue(reference?.contact_designation)
    this.addReference?.show()
  }

  modalDeleteEmitReference(e: any){
    this.type = "ref"
    this.idDelete = e
    this.deleteRecordModal?.show()
  }


  saveReference(e: any) {
    this.submitted = true
    if(this.formReference.valid){
        if(e == "ajout"){
            this.referenceArray.push(this.formReference.value)
        }else if(e == "edit") {
            this.referenceArray[this.idDelete] = this.formReference.value
        }
        console.log(this.referenceArray)
        this.dataService.setReferenceList$(this.referenceArray)
        this.formReference.reset()
        this.submitted = false
        this.addReference?.hide()
    }
  }

  onChangeFile(event: any, type: any){
    event.preventDefault()

/*
    if(event.target.files && event.target.files.length){

      const reader = new FileReader();
      const file: File = event.target.files[0]
      reader.readAsDataURL(file);
      reader.onload = () =>
      {
        if(this.formReference.contains(type)){
          this.formReference.setControl(type,this.fb.control(reader.result))
        }else{
          this.formReference.addControl(type,this.fb.control(reader.result) )
        }

      }
    }

    */

  }

  device(e: any){
    console.log(e)
    this.formReference.controls['contact_approx_amount'].setValue(e)

  }
  ngSelectChange(e: any){
    console.log(e)
    this.formActionnaire.controls['nationalite'].setValue(e)
  }
}
