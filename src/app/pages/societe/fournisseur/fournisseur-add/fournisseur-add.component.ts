import {Component, TemplateRef, ViewChild} from '@angular/core';
import { FormBuilder,  UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Entreprise } from 'src/app/core/models/entreprise.model';
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
import {Actionnaire} from "../../../../core/models/actionnaire.model";
import {ReferenceCommericiale} from "../../../../core/models/referenceCommericiale.model";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {formatDate} from "@angular/common";
import {ActionnaireService} from "../../../../core/services/actionnaire.service";
import {CommercialesService} from "../../../../core/services/commerciales.service";
import {DomaineActivite} from "../../../../core/models/domaine-activite.model";
import {TypeSociete} from "../../../../core/models/type-societe.model";
import { chatMessagesData } from './data';

@Component({
  selector: 'app-fournisseur-add',
  templateUrl: './fournisseur-add.component.html',
  styleUrls: ['./fournisseur-add.component.scss']
})
export class FournisseurAddComponent {

  @ViewChild('successContent', { static: false }) successContent?: ModalDirective;
  @ViewChild('addActionnaire', { static: false }) addActionnaire?: ModalDirective;
  @ViewChild('addReference', { static: false }) addReference?: ModalDirective;
  @ViewChild('deleteRecordModal', { static: false }) deleteRecordModal?: ModalDirective;
  @ViewChild('errorContent', { static: false }) errorContent?: ModalDirective;

  demandeur = {} as  any;
  entreprise = {} as  any;
  entrepriseDocument!: Entreprise;
  succes = false


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



  color: any;

  colorTheme: any = 'theme-blue';
  bsConfig?: Partial<BsDatepickerConfig>;


  modalRef?: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };


  public registrationForm!: UntypedFormGroup;
  public formActionnaire!: UntypedFormGroup;
  public formReference!: UntypedFormGroup;
  public formStep1!: UntypedFormGroup;
  public formStep2!: UntypedFormGroup;
  public formStep3!: UntypedFormGroup;
  public formDocu!: UntypedFormGroup;

  listForm!: UntypedFormGroup;



  regionList =  [] as Region[];
  prefectureList= [] as Prefecture[];
  prefectureRegion = [] as Prefecture[];
  communeList = [] as Commune[];
  communePrefecture = [] as Commune[];
  domaineActivites = [] as DomaineActivite[];
  typeSocietes = [] as TypeSociete[];
  domaineList= [] as  number[];

  regionDefault: number | undefined = 0;
  prefectureDefault: number | undefined = 0;
  communeDefault: number | undefined = 0;

  imageURL: string = './assets/images/defaultlogo.png';

  messageArray = [] as any[]
  errorArray = [] as any[]
  keyArray = [] as any[]


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
    private actionnaireService : ActionnaireService,
    private commercialesService : CommercialesService,
    private modalService: BsModalService
  ) {}



  ngOnInit(): void {

    this.createForm()

    this.route.data.subscribe((data) =>{
      const {menu, sousmenu} = data
      this.menu = menu
      this.sousmenu = sousmenu
    })

  
    this.helperService.getCommmune().subscribe((commune: Commune[]) => {
      this.communeList = commune
      this.helperService.getPrefecture().subscribe((prefecture: Prefecture[]) => {
          this.prefectureList = prefecture
          this.helperService.getRegion().subscribe((region: Region[]) => {this.regionList = region})
        })
  })

    this.domaineActiviteService.getData().subscribe((data )=>{
      this.domaineActivites = data
    })

    this.typeSocieteService.getData().subscribe(data =>{
      this.typeSocietes = data
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

  selectedIndex =  0
  change(event: any) {
    this.selectedIndex = event?.selectedIndex

    console.log(event)

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

  get f1(){ return this.formStep1.controls  }
  get f2(){ return this.formStep2.controls  }
  get f3(){ return this.formDocu.controls  }


  createForm(){

    this.formActionnaire = this.fb.group({
      id: [''],
      last_name: ['', [Validators.required]],
      first_name: ['', [Validators.required]],
      date_of_birth: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      phone_number: ['', []],
      email: ['', [Validators.required, Validators.email]],
      role: ['', []],
      username: ['', []],
      associate_percentage: ['', [Validators.required]],
      nationality: ['', []]
    });

    this.formReference = this.fb.group({
      id: [''],
      company_name: ['', [Validators.required]],
      contact_full_name: ['', [Validators.required]],
      contact_phone_number: ['', []],
      contact_designation: ['', []],
      contact_email: ['', [ Validators.email]],
      contact_approx_amount: ['', []],
      reference: ['', []],
      supplier: ['', []],
      doc: ['', []],
      contact_approx_amount_currency: ['', []]
    });

    this.formStep1 = this.fb.group({
      last_name: ['', [Validators.required]],
      first_name: ['', [Validators.required]],
      date_of_birth: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      phone_number: ['', []],
      email: ['', [Validators.required, Validators.email]],
      profession: ['', []],
      username: ['', []],
      slug: ['', []],
      is_old: [true, []],
      supplier: this.fb.group({
        rccm: ['', []],
        name: ['', []],
        social_capital: ['', []],
        chiffre_affaire: ['', []],
        categories: ['0', []],
        description: ['', []],
        type: ['', []],
        year_of_registration: ['', []],
        phone_number: ['', []],
        website: ['', []],
        email: ['', []],
        address: ['', []],
        region: ['', []],
        prefecture: ['', []],
        commune: ['', []]
      })
    });

    this.formStep2 = this.fb.group({
        rccm: ['', [Validators.required]],
        name: ['', [Validators.required]],
        social_capital: ['', [Validators.required]],
        chiffre_affaire: ['', [Validators.required]],
        categories: ['0', [Validators.required]],
        description: ['', [Validators.required]],
        type: ['', [Validators.required]],
        year_of_registration: ['', [Validators.required]],
        phone_number: ['', [Validators.required]],
        website: ['', []],
        email: ['', [Validators.required, Validators.email]],
        address: ['', [Validators.required]],
        region: ['', [Validators.required]],
        prefecture: ['', [Validators.required]],
        commune: ['', [Validators.required]]
    });

    this.formStep3 = this.fb.group({   });

    this.formDocu = this.fb.group({
      doc_rccm: ['', [Validators.nullValidator]],
      doc_nif: ['', [Validators.nullValidator]],
      doc_dni: ['', [Validators.nullValidator]],
      doc_cnss: ['', [Validators.nullValidator]],
      doc_status: ['', [Validators.nullValidator]],
      doc_aguipe: ['', [Validators.nullValidator]]

    });
  }


  /**
   * first step
   */

  firstStep(e: any){
    e.preventDefault()
    this.formStep1.get('username')?.setValue(this.formStep1.get('email')?.value)
    let yr = formatDate(this.formStep1.get('date_of_birth')?.value,'yyyy-MM-dd',"en-US")
    this.formStep1.get('date_of_birth')?.patchValue(yr)

    this.demandeur = this.formStep1.value
  }

  /**
   * second step
   */

  secondStep(e: any){
    e.preventDefault()
    let yr = formatDate(this.formStep2.get('year_of_registration')?.value,'yyyy-MM-dd',"en-US")
    this.formStep2.get('year_of_registration')?.patchValue(yr)
    this.formStep2.get('categories')?.patchValue(this.domaineList)

    this.entreprise = this.formStep2.value
  }

  fileChange(event: any) {
    let fileList: any = (event.target as HTMLInputElement);
    let file: File = fileList.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onload = () => {
      this.imageURL = reader.result as string;

      document.querySelectorAll('#user-img').forEach((element: any) => {
        element.src = this.imageURL;
      });
      if(this.formStep2.contains('logo')){
        this.formStep2.setControl('logo', this.fb.control(reader.result) )
      }else{
        this.formStep2.addControl('logo',this.fb.control(reader.result) )
      }

    }
  }

  onRegionSelect(e: any, type: any = 0){
    let k = 0
    type? k= e : k = e.target.value
    this.prefectureRegion = this.prefectureList.filter((prefecture)=> prefecture.region!.id == k)

    console.log(this.prefectureRegion)
  }

  onPrefectureSelect(e: any, type: any = 0){
    let k = 0
    type? k= e : k = e.target.value
    this.communePrefecture= this.communeList.filter(commune=> commune.prefecture!.id == k)
    console.log(this.communePrefecture)
  }

  onChangeDomaine(e: any){
    if(e.target.checked){
      if(this.domaineList.length < 5){
        this.domaineList.push(e.target.value)
        this.formStep2.get('categories')?.patchValue(this.domaineList)
      }
      else{
        e.target.checked = false
        Swal.fire({ text: 'Vous avez atteint le nombre maximal de domaine d\'activité', confirmButtonColor: '#4b93ff', showCancelButton: false, });

      }

    }else{
      let index = this.domaineList.findIndex(item => item=== e.target.value); //find index in your array
      this.domaineList.splice(index, 1);//remove element from array
    }
  }

  /**
   *
   * thrid step
   */

  saveActionnaire(e: any){
    let yr = formatDate(this.formActionnaire.get('date_of_birth')?.value,'yyyy-MM-dd',"en-US")
    this.formActionnaire.get('date_of_birth')?.patchValue(yr)
    this.submitted = true
    if(this.formActionnaire.valid){
      if(e == "ajout"){
        this.actionnaireArray.push(this.formActionnaire.value)
      }else if(e == "edit") {
        this.actionnaireArray[this.idDelete] = this.formActionnaire.value
      }
      console.log(this.actionnaireArray)
      this.dataService.setActionnaireList$(this.actionnaireArray)
      this.formActionnaire.reset()
     // this.submitted = false
      this.addActionnaire?.hide()
    }


  }

  openDeleteActionnaire(e: any, i: any){
    e.preventDefault()
    this.type = "act"
    this.idDelete = i
    this.deleteRecordModal?.show()
  }

  editActionnaire(e: any, i: any){
    e.preventDefault()
    this.submitted = false
    this.modalAjoutTitle = "Editon d'un actionnaire"
    this.actsave = "edit"
    this.idDelete = i
    this.formActionnaire.patchValue(this.actionnaireArray[i])
    this.formActionnaire.controls['date_of_birth'].patchValue(formatDate(this.actionnaireArray[i].date_of_birth, 'MM/dd/yyyy',"en-US") )
    this.addActionnaire?.show()

  }

  openActionnaireModal(){
    this.modalAjoutTitle = "Ajout d'un actionnaire"
    this.actsave = "ajout"
    //this.formActionnaire.reset()
    this.submitted = false
    this.addActionnaire?.show()
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

  openReferenceModal(e:any){
    e.preventDefault()
    //this.formReference.reset()
    this.submitted = false
    this.modalAjoutTitle = "Ajout d'une référence Commerciale"
    this.actsave = "ajout"
    this.addReference?.show()
  }

  editReference(template: TemplateRef<any>, e: any, i: any){
    e.preventDefault()
    this.submitted = false
    this.modalAjoutTitle = "Editon d'une référence Commerciale"
    this.actsave = "edit"
    this.idDelete = i
    this.formReference.patchValue(this.referenceArray[i])
    this.modalRef = this.modalService.show(template, this.config);
  }

  openDeleteReference(e: any, i: any){
    this.type = "ref"
    this.idDelete = i
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
        //console.log(this.referenceArray)
        this.dataService.setReferenceList$(this.referenceArray)
        //this.formReference.reset()
        this.submitted = false
        this.modalRef?.hide()
    }
  }

  onChangeFile(event: any, type: any){
    event.preventDefault()
  }

  device(e: any){
    console.log(e)
    this.formReference.controls['contact_approx_amount'].setValue(e)

  }
  ngSelectChange(e: any){
    console.log(e)
    this.formActionnaire.controls['nationality'].setValue(e)
  }

  onChange(event: any, type: any){

    if(event.target.files && event.target.files.length){

      const reader = new FileReader();
      const file: File = event.target.files[0]
      reader.readAsDataURL(file);
      reader.onload = () =>
      {
        if(this.formStep3.contains(type)){
          this.formStep3.setControl(type,this.fb.control(reader.result))
        }else{
          this.formStep3.addControl(type,this.fb.control(reader.result) )
        }

      }
    }

  }

  save(e: any){

    e.preventDefault()

    this.entrepriseDocument  = this.formDocu.value

    this.formStep1.get('supplier')?.patchValue(this.formStep2.value)

    this.userProfileService.postDataSupplier(this.formStep1.value).subscribe({
      next: (res: User)=> {
      /*  this.actionnaireArray.forEach((actionnaire: Actionnaire) =>{
          let data = { ...actionnaire, ...{"supplier": res.id}}
          this.actionnaireService.postData(data).subscribe(data => console.log(data))
        })

        this.referenceArray.forEach((commericiale: ReferenceCommericiale) =>{
          let data = { ...commericiale, ...{"supplier": res.id}}
          this.commercialesService.postData(data).subscribe(data => console.log(data))
        })
          */
        this.succes = true
      },
      error:(err)=>{
        this.handleError(err)

      }
    })

  }

  reload(e: any){
    window.location.reload()

  }


  nameRegion = (id: any) => this.regionList.find((r : Region) => r.id == id)?.name!

  namePrefecture = (id: any) => this.prefectureList.find((p : Prefecture) => p.id == id)?.name!

  nameCommune = (id: any) => this.communeList.find((c : Commune) => c.id == id)?.name!

  nametypeSociete = (id: any) =>  this.typeSocietes.find((c : TypeSociete) => c.id == id)?.name!

  nameDomaineActivite = (id: any) =>  this.domaineActivites.find((c : DomaineActivite) => c.id == id)?.name!

  handleError(err: any){

    this.errorArray = err.error
    this.messageArray =  Object.values(err.error)
    this.keyArray =  Object.keys(err.error)
    this.errorContent?.show()
  }

  addReferenceModal(template: TemplateRef<any>) {

    this.modalAjoutTitle = "Ajout d'une référence commerciale"
    this.modalRef = this.modalService.show(template, this.config);
  }
  ReferenceModal(template: TemplateRef<any>) {

    this.modalAjoutTitle = "Ajout d'une référence commerciale"
    this.modalRef = this.modalService.show(template, this.config);
  }

}
