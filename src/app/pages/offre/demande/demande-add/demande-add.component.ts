import {Component, TemplateRef, ViewChild} from '@angular/core';
import {FormArray, FormControl, UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {RxwebValidators} from '@rxweb/reactive-form-validators';
import {ToastrService} from 'ngx-toastr';
import {TypeDemandeService} from "../../../../core/services/type-demande.service";
import {TypeDemande} from "../../../../core/models/type-demande.model";
import {BuyerService} from "../../../../core/services/buyer.service";
import {Buyer} from "../../../../core/models/buyer.model";
import {DomaineActivite} from "../../../../core/models/domaine-activite.model";
import {DomaineActiviteService} from "../../../../core/services/domaine-activite.service";
import {Entreprise} from "../../../../core/models/entreprise.model";
import {FournisseurService} from "../../../../core/services/fournisseur.service";
import {AuthentificationService} from "../../../../core/services/auth.service";
import {DemandeService} from "../../../../core/services/demande.service";
import {BsModalRef, BsModalService, ModalDirective} from "ngx-bootstrap/modal";
import {DocumentService} from "../../../../core/services/document.service";
import {Options} from "@angular-slider/ngx-slider";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {formatDate} from "@angular/common";
import { chatMessagesData } from 'src/app/pages/societe/fournisseur/fournisseur-add/data';

@Component({
  selector: 'app-demande-add',
  templateUrl: './demande-add.component.html',
  styleUrls: ['./demande-add.component.scss']
})
export class DemandeAddComponent {

  @ViewChild('successContent', { static: false }) successContent?: ModalDirective;
  @ViewChild('addDocument', { static: false }) addDocument?: ModalDirective;
  @ViewChild('errorContent', { static: false }) errorContent?: ModalDirective;

  public formRegister!: UntypedFormGroup;
  public formDocument!: UntypedFormGroup;
  submitted = false;
  currentFile?: File;
  menu = '';
  sousmenu = '';

  typeDemande!: TypeDemande[];
  domaineList: number[] = [];
  fournisseurList: number[] = [];
  buyer!: Buyer[];
  domaineActivites!: DomaineActivite[];
  fournisseurs!: Entreprise[];

  restriction!: boolean;
  emailEnvoie!: boolean;

  documentArray = [] as any[]


  // bread crumb items
  breadCrumbItems!: Array<{}>;
  colorTheme: any = 'theme-blue';
  bsConfig?: Partial<BsDatepickerConfig>;



  messageArray = [] as any[]
  errorArray = [] as any[]
  keyArray = [] as any[]

  modalRef?: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };


  constructor(
    public toastService: ToastrService,
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private typeDemandeService: TypeDemandeService,
    private domaineActiviteService: DomaineActiviteService,
    private fournisseurService: FournisseurService,
    private buyerService: BuyerService,
    private authenticationService: AuthentificationService,
    private demandeService : DemandeService,
    private documentservice : DocumentService,
    private modalService: BsModalService
  ) {
  }



  ngOnInit(): void {

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
    this.createForm()

    this.typeDemandeService.getData().subscribe(data => this.typeDemande = data)
    this.domaineActiviteService.getData().subscribe(data => this.domaineActivites = data)
    this.buyerService.getData().subscribe(data => this.buyer = data)
    this.fournisseurService.getData().subscribe(data => this.fournisseurs = data)


    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme, showWeekNumbers: false });


  }

  modeSoumission: Array<{ id: string, name: string }> = [
    {id: 'bstp', name: "Envoyez le dossier par la plateforme de la BSTP"},
    {id: 'mail', name: "Envoyez le dossier par le mail"},
    {id: 'physic', name: "Envoyez le dossier physiquement a l’acheteur"},
  ];

  typeRetriction: Array<{ id: string, name: string }> = [
    {id: 'sector', name: "Offre restreinte par Secteurs d'activité"},
    {id: 'supplier', name: "Offre restreinte par Fournisseurs"},
    {id: 'labelisation', name: "Offre restreinte par Label BSTP"},
  ];

  regions: Array<{ id: number, name: string }> = [
    {id: 1, name: "Boke"},
    {id: 2, name: "Conakry"},
    {id: 3, name: "Kindia"},
    {id: 4, name: "Labe"},
  ];



  createForm() {

    this.formDocument = this.fb.group({
      name: ['',[]],
      document: ['',[]],
      doc: ['',[]],
      docUrl: ['', []]
    })

    this.formRegister = this.fb.group({
      published_at: ['',[]],
      is_external: [true, []],
      status: ['draft', []],
      document:  ['',[]],
      name: ['Achat des engin roulant', [Validators.required]],
      type: [1, [Validators.required]],
      summary: ['accquission', [Validators.required]],
      description: ['dd ddddd', [Validators.required]],
      expired_at: ['', [Validators.required]],
      submission_instructions: ['bstp', []],
      reference: ['', [Validators.required]],
      buyer: ['', [Validators.required]],
      created_by: ['', []],
      email: [null, []],
      modality: ['', [Validators.required]],
      restricted_type: ['sector', []],
      restricted_suppliers: [[], []],
      categories: [[], []],
      restricted_label: ['', []],
      chiffre_affaire_max: [0, []],
      chiffre_affaire_min: [0, []]

    });
  }

  get f() {
    return this.formRegister.controls;
  }
  get ff() {
    return this.formDocument.controls;
  }


  register() {
    this.formRegister.controls['published_at'].setValue(formatDate(this.formRegister.controls['published_at'].value,'yyyy-MM-dd',"en-US"))
    this.formRegister.controls['expired_at'].setValue(formatDate(this.formRegister.controls['expired_at'].value,'yyyy-MM-dd',"en-US"))


    if (this.formRegister.valid) {
      let data = { ...this.formRegister.value, ...{"created_by": this.authenticationService.currentUserValue.id }}
      if(this.documentArray.length > 0)
        data = { ...data, ...{"documents": this.documentArray} }

      this.demandeService.postData(data).subscribe({
        next: (res)=> {

          this.documentArray.forEach(data =>{
            this.documentservice.postData({ "request": res?.id, "name": data.name, "document": data.document}).subscribe({
              next:(res) =>{},
              error:(err) =>{}
            })
          })

          this.successContent?.show()

        },
        error:(err)=>{
          this.handleError(err)
        }
      })

    } else {

      this.toastService.error('Complete les champs obligatoires', 'Erreur', {
        timeOut: 3000,
      })
    }
  }

  cancel(e: Event) {
    e.preventDefault()
    this.router.navigate(['../offre/demande'])

  }

  onChangeRectriction(e: any) {
    this.formRegister.get('restricted_type')?.patchValue(0)
    this.resetValidator()

    this.restriction = !!e.target.checked;
    if(!this.restriction){
      this.resetValidator()
      this.sector = false
      this.supplier = false
    }
  }

  sector: boolean = true
  supplier: boolean = false
  labelisation: boolean = false


  resetValidator(){
    this.formRegister.get('restricted_label')?.patchValue('');
    this.formRegister.get('categories')?.patchValue([]);
    this.formRegister.get('restricted_suppliers')?.patchValue([]);


    this.formRegister.get('restricted_suppliers')?.clearValidators();
    this.formRegister.get('restricted_suppliers')?.updateValueAndValidity();
    this.formRegister.get('restricted_label')?.clearValidators();
    this.formRegister.get('restricted_label')?.updateValueAndValidity();
    this.formRegister.get('categories')?.clearValidators();
    this.formRegister.get('categories')?.updateValueAndValidity();
  }

  onRestrictedTypeChanged(e: Event) {
    e.preventDefault()
    let type = this.formRegister.get('restricted_type')?.value

    this.domaineList = []

    this.sector = false
    this.supplier = false
    this.labelisation = false
    this.resetValidator()


    switch (type) {
      case "sector": {
        this.sector = true

        this.formRegister.get('categories')?.setValidators([Validators.required]);
        this.formRegister.get('categories')?.updateValueAndValidity();


        break
      }
      case "supplier": {

        this.supplier = true
        this.formRegister.get('restricted_suppliers')?.setValidators([Validators.required]);
        this.formRegister.get('restricted_suppliers')?.updateValueAndValidity();


        break
      }
      case "labelisation": {

        this.labelisation = true
        this.formRegister.get('restricted_label')?.setValidators([Validators.required]);
        this.formRegister.get('restricted_label')?.updateValueAndValidity();


        break
      }
      default:
    }

  }


  onChangeDomaine(e: any) {
    if (e.target.checked) {
      this.domaineList.push(e.target.value)
      this.formRegister.get('categories')?.patchValue(this.domaineList)
    } else {
      let index = this.domaineList.findIndex(item => item === e.target.value); //find index in your array
      this.domaineList.splice(index, 1);//remove element from array
    }

  }

  onCheckboxSuppliersChange(e: any) {
    console.log(e)
  }

  onSuppliersChange(e: any) {
    //console.log(e)
   // console.log(this.restricted_suppliers)
    console.log(this.formRegister.get('restricted_suppliers')?.value)

   // this.fournisseurList.push(e)
   // console.log(this.fournisseurList)
    //console.log( this.formRegister.get('restricted_label')?.value)


  }

  onModaliteChange(e: any) {
    let modalite = this.formRegister.get('submission_instructions')?.value
    console.log(modalite)
    modalite == "mail" ? this.emailEnvoie = true : this.emailEnvoie = false
  }


  liste(e: any){
    e.preventDefault()
    this.successContent?.hide()
    this.router.navigate(['../offre/demande'])
  }

  nouveau(e: any){
    e.preventDefault()
    this.successContent?.hide()
   // this.formRegister.reset()
    window.location.reload()
  }

  openDocumentModal(){
  }

  saveDocument(){
    this.documentArray.push(this.formDocument.value)
    this.modalRef?.hide()

  }
documentView(e : any, i: number){
    e.preventDefault()


}
documentDelete(e : any, i: number){
    e.preventDefault()
    this.documentArray.splice(i, 1)


}

  onChangeFile(event: any){

    if(event.target.files && event.target.files.length){

      const reader = new FileReader();
      const file: File = event.target.files[0]
      reader.readAsDataURL(file);
      reader.onload = () =>
      {
          this.formDocument.setControl('document',this.fb.control(reader.result))
         // this.formDocument.setControl('docUrl',this.fb.control(reader.result as string))
      }
    }

  }


  value1 = 0;
  minVal = 0;
  maxVal = 20000000000;
  option1: Options = {
    floor: 0,
    step: 50000000,
    ceil: 20000000000,
    showTicks: true,
    translate: (value: number): string => {
      return  value + 'GNF';
    }
  };


  rangeValueChange(e: any){

    console.log(e)

  }
  valueChange(e: any){

    this.formRegister.get('chiffre_affaire_max')?.patchValue(e.value)
    this.formRegister.get('chiffre_affaire_min')?.patchValue(e.highValue)

  }



  addDocumentModal(template: TemplateRef<any>) {

    this.formDocument.controls['name'].patchValue('')
    this.formDocument.controls['document'].patchValue('')

    this.modalRef = this.modalService.show(template, this.config);
  }


  protected readonly chatMessagesData = chatMessagesData;
  restricted_suppliers: any;


  handleError(err: any){

    this.errorArray = err.error
    this.messageArray =  Object.values(err.error)
    this.keyArray =  Object.keys(err.error)
   // this.errorContent?.show()
  }
}
