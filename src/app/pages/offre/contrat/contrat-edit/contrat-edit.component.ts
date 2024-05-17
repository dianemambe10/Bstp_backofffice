import {Component, TemplateRef, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService, ModalDirective} from "ngx-bootstrap/modal";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {TypeDemande} from "../../../../core/models/type-demande.model";
import {Buyer} from "../../../../core/models/buyer.model";
import {DomaineActivite} from "../../../../core/models/domaine-activite.model";
import {Entreprise} from "../../../../core/models/entreprise.model";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {TypeDemandeService} from "../../../../core/services/type-demande.service";
import {DomaineActiviteService} from "../../../../core/services/domaine-activite.service";
import {FournisseurService} from "../../../../core/services/fournisseur.service";
import {BuyerService} from "../../../../core/services/buyer.service";
import {AuthentificationService} from "../../../../core/services/auth.service";
import {DemandeService} from "../../../../core/services/demande.service";
import {DocumentService} from "../../../../core/services/document.service";
import {formatDate} from "@angular/common";
import {Options} from "@angular-slider/ngx-slider";
import {Requests} from "../../../../core/models/requests.model";
import { ContratService } from 'src/app/core/services/contrat.service';
import { Contrat } from 'src/app/core/models/contrat.model';
import { existingList } from '../../demande/demande-edit/data';

@Component({
  selector: 'app-contrat-edit',
  templateUrl: './contrat-edit.component.html',
  styleUrls: ['./contrat-edit.component.scss']
})
export class ContratEditComponent {
  @ViewChild('successContent', {static: false}) successContent?: ModalDirective;
  @ViewChild('addDocument', {static: false}) addDocument?: ModalDirective;
  @ViewChild('errorContent', {static: false}) errorContent?: ModalDirective;


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

  restrict = 'tous'

  messageArray = [] as any[]
  errorArray = [] as any[]
  keyArray = [] as any[];

  attachementArray = [] as any[]
  attachementList = [] as number[]

  is_bstp = false
  sector: boolean = true
  supplier: boolean = false
  labelisation: boolean = false

  modalRef?: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  id!: number;
  contrat!: Contrat;


  demandes!: any;
  demande!: any;
  defaultBuyer = 0
  defaultType = 0
  existingData: any;
  existingTerm: any;
  colorTheme: any = 'theme-blue';
  bsConfig?: Partial<BsDatepickerConfig>;

  constructor(
    public toastService: ToastrService,
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private fournisseurService: FournisseurService,
    private contratService: ContratService,
    private demandeService: DemandeService,
    private modalService: BsModalService
  ) {
  }

  get f() {
    return this.formRegister.controls;
  }

  get ff() {
    return this.formDocument.controls;
  }

  ngOnInit(): void {
    this.existingData = existingList

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

    this.bsConfig = Object.assign({}, {containerClass: this.colorTheme, showWeekNumbers: false});

    this.createForm()

   // this.typeDemandeService.getData().subscribe(data => this.typeDemande = data)
 //   this.domaineActiviteService.getData().subscribe(data => this.domaineActivites = data)
   // this.buyerService.getData().subscribe(data => this.buyer = data)
    this.fournisseurService.getData().subscribe(data => this.fournisseurs = data)

   

    this.id = this.route.snapshot.params['id']

      this.contratService.getSingleData(this.id).subscribe((data: Contrat)=>{
        this.contrat = data
        this.formRegister.controls['id'].setValue(this.contrat.id)
        this.formRegister.controls['bstp_member'].setValue(this.contrat.bstp_member)
        if(this.contrat.company)
          this.formRegister.controls['company'].setValue(this.contrat.company.id)
        this.formRegister.controls['observation'].setValue(this.contrat.observation)
        this.formRegister.controls['other_company'].setValue(this.contrat.other_company)
        this.formRegister.controls['amount'].setValue(this.contrat.amount)
        this.formRegister.controls['request'].setValue(this.contrat.request)
        this.formRegister.controls['description'].setValue(this.contrat.description)
        this.formRegister.controls['signature_date'].setValue(formatDate(this.contrat.signature_date, 'MM/dd/yyyy', "en-US"))
         
        if(this.contrat.bstp_member){
          this.is_bstp = true
          this.formRegister.get('company')?.enable()
          this.formRegister.get('other_company')?.disable()
          
        }else{
          this.formRegister.get('company')?.disable()
          this.formRegister.get('other_company')?.enable()
        }

        this.demandeService.getData().subscribe((data: Requests[]) => {
          this.demandes = data
          this.findDemande(this.contrat.request.id)
    
        })
            

       

      })

  }

  createForm() {


    this.formRegister = this.fb.group({
      id: ['', []],
      bstp_member: [false, []],
      company: [{value: '0', disabled: true}, [Validators.required]],
      other_company: [{value: '0', disabled: false}, [Validators.required]],
      signature_date: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      request: ['', [Validators.required]],
      description: ['description', [Validators.required]],
      observation: ['', [Validators.required]],


    });
  }

  register() {
    this.formRegister.controls['signature_date'].setValue(formatDate(this.formRegister.controls['signature_date'].value, 'yyyy-MM-dd', "en-US"))
    this.formRegister.controls['request'].setValue(this.demande?.id)
    if (this.formRegister.valid) {
      this.contratService.patchData(this.formRegister.value).subscribe({
        next: (res) => {
          this.successContent?.show()
        },
        error: (err) => {
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
    this.router.navigate(['../offre/contrat'])

  }

  


  onCheckboxSuppliersChange(e: any) {
    console.log(e)
  }

  onSuppliersChange(e: any) {
   


  }

  onModaliteChange(e: any) {
    let modalite = this.formRegister.get('submission_instructions')?.value
    console.log(modalite)
    modalite == "mail" ? this.emailEnvoie = true : this.emailEnvoie = false
  }

  liste(e: any) {
    e.preventDefault()
    this.successContent?.hide()
    this.router.navigate(['../offre/contrat'])
  }

  nouveau(e: any) {
    e.preventDefault()
    this.successContent?.hide()
    this.formRegister.reset()
  }

  sendDocument(e: any){

  }


  rangeValueChange(e: any) {

    console.log(e)

  }

  valueChange(e: any) {

    this.formRegister.get('chiffre_affaire_max')?.patchValue(e.value)
    this.formRegister.get('chiffre_affaire_min')?.patchValue(e.highValue)

  }



  handleError(err: any) {

    this.errorArray = err.error
    this.messageArray = Object.values(err.error)
    this.keyArray = Object.keys(err.error)
    this.errorContent?.show()
  }

  showFilter() {
    const filterStyle = (document.getElementById("propertyFilters") as HTMLElement).style.display;
    if (filterStyle == 'none') {
      (document.getElementById("propertyFilters") as HTMLElement).style.display = 'block'
    } else {
      (document.getElementById("propertyFilters") as HTMLElement).style.display = 'none'
    }
  }

  findDemande(e: any){
    console.log(e)
    let index = this.demandes.findIndex( (item: Requests)=> item.id == e )
    this.demande = this.demandes[index]
    console.log(this.demande)
  }

  onChangeAdjudicataire(e: any) {
    console.log(e)
    this.is_bstp = !!e.target.checked;
    if(this.is_bstp){
      this.formRegister.get('company')?.enable()
      this.formRegister.get('other_company')?.disable()
    }else{
      this.formRegister.get('other_company')?.enable()
      this.formRegister.get('company')?.disable()
    }
   // e.target.value ? this.is_bstp = true : this.is_bstp = false

  }
}
