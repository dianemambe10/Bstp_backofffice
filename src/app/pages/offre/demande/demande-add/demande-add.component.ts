import { TypeSocieteService } from './../../../../core/services/type-societe.service';
import { Component } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { ToastrService } from 'ngx-toastr';
import {TypeDemandeService} from "../../../../core/services/type-demande.service";
import {TypeDemande} from "../../../../core/models/type-demande.model";
import {BuyerService} from "../../../../core/services/buyer.service";
import {Buyer} from "../../../../core/models/buyer.model";
import {DomaineActivite} from "../../../../core/models/domaine-activite.model";
import {DomaineActiviteService} from "../../../../core/services/domaine-activite.service";
import {Entreprise} from "../../../../core/models/entreprise.model";
import {FournisseurService} from "../../../../core/services/fournisseur.service";

@Component({
  selector: 'app-demande-add',
  templateUrl: './demande-add.component.html',
  styleUrls: ['./demande-add.component.scss']
})
export class DemandeAddComponent {

  public formRegister!: UntypedFormGroup;
  submitted = false;
  currentFile?: File;
  menu = '';
  sousmenu = '';

  typeDemande!: TypeDemande[];
  domaineList: number[]= [];
  buyer!: Buyer[];
  domaineActivites!: DomaineActivite[];
  fournisseurs!: Entreprise[];

  restriction!: boolean;
  emailEnvoie!: boolean;

  constructor(
    public toastService: ToastrService,
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private typeDemandeService: TypeDemandeService,
    private domaineActiviteService: DomaineActiviteService,
    private fournisseurService: FournisseurService,
    private buyerService : BuyerService
    ) {}


    // bread crumb items
    breadCrumbItems!: Array<{}>;

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
      /* setTimeout(() => {
         this.CoursesList.subscribe(x => {
           this.listData = Object.assign([], x);
         });
         document.getElementById('elmLoader')?.classList.add('d-none')
       }, 1000)

       */

      this.createForm()

      this.typeDemandeService.getData().subscribe(data => this.typeDemande = data)
      this.domaineActiviteService.getData().subscribe(data => this.domaineActivites = data)
      this.buyerService.getData().subscribe(data => this.buyer = data)
      this.fournisseurService.getData().subscribe(data => this.fournisseurs = data)

     }

  modeSoumission: Array<{ id: string, name: string }> = [
    { id: 'bstp', name: "Envoyez le dossier par la plateforme de la BSTP" },
    { id: 'mail', name: "Envoyez le dossier par le mail" },
    { id: 'physic', name:  "Envoyez le dossier physiquement a l’acheteur"},
  ];

  typeRetriction: Array<{ id: string, name: string }> = [
    { id: 'sector', name: "Offre restreinte par Secteurs d'activité" },
    { id: 'supplier', name: "Offre restreinte par Fournisseurs" },
    { id: 'labelisation', name: "Offre restreinte par Label BSTP" },
  ];

     regions: Array<{ id: number, name: string }> = [
      { id: 1, name: "Boke" },
      { id: 2, name: "Conakry" },
      { id: 3, name: "Kindia" },
      { id: 4, name: "Labe" },
    ];

    name = new FormControl('',[Validators.required, Validators.minLength(3)])
    reference = new FormControl('',[Validators.required, Validators.minLength(3), ])

    type_demande = new FormControl('',[
      Validators.required,
    ])

    domaine = new FormControl('',[
      Validators.required,
    ])
  deadline = new FormControl('',[
      Validators.required,
      //Validators.pattern(/^(0?[1-9]|1[0-2])[\/](0?[1-9]|[12]\d|3[01])[\/](19|20)\d{2}$/)
    ])

  published_at = new FormControl('',[
      Validators.required,
      //Validators.pattern(/^(0?[1-9]|1[0-2])[\/](0?[1-9]|[12]\d|3[01])[\/](19|20)\d{2}$/)
    ])

  summary = new FormControl('',[Validators.required])


  description = new FormControl('',[Validators.required])

    instruction_soumission = new FormControl('',[

    ])

    document = new FormControl('',[
      RxwebValidators.extension({extensions:["pdf","doc","docx"]})
    ])

    buyer_id = new FormControl('',[
      Validators.required,
    ])

    restricted_type = new FormControl('',[
      Validators.required,
    ])

    createForm(){

      this.formRegister = this.fb.group({
        published_at: this.published_at,
        document: this.document,


        name: this.fb.control(null, [Validators.required]),
        type: this.fb.control(1, [Validators.required]),
        summary: this.fb.control(null, [Validators.required]),
        description: this.fb.control(null, [Validators.required]),
        expired_at: this.fb.control(null, [Validators.required]),
        submission_instructions: this.fb.control(null, []),
        categories: this.fb.array([], [Validators.required]),
        reference: this.fb.control(null, [Validators.required]),
        buyer: this.fb.control(null, []),
        created_by: this.fb.control(null, []),
        email: this.fb.control(null, []),
        modality: this.fb.control("bstp", [Validators.required]),
        restricted_type: this.fb.control(null, []),
        restricted_suppliers: this.fb.array([], [Validators.required]),
        restricted_label: this.fb.control('', [Validators.required]),

      });
    }

    get f() { return this.formRegister.controls; }


    register(){
      if(this.formRegister.valid){



       /* this.typeSocieteService.postData(this.formRegister.value).subscribe({
          next: (res)=> {
            this.formRegister.reset()
            this.submitted= true;
            this.toastService.success('Nouveau type de societe a été ajouté avec success', 'Succèss',{
              timeOut: 3000,
            })
            this.router.navigate(['../offre/demande'])

          },
          error:(err)=>{
            this.toastService.error('Une erreur survenue', 'Erreur',{
              timeOut: 3000,
            })

          }
        })*/
      }else{

        this.toastService.error('Complete les champs obligatoires', 'Erreur',{
          timeOut: 3000,
        })

      }


    }

    cancel(e: Event){
      e.preventDefault()
      this.router.navigate(['../offre/demande'])

    }

  onChangeRectriction(e: any){
    if(e.target.checked){
      this.restriction = true

    }else{
      this.restriction = false
    }
  }

  sector: boolean = false
  supplier: boolean = false
  labelisation: boolean = false

  onRestrictedTypeChanged(e: Event){

      let type =  this.formRegister.get('restricted_type')?.value

      switch (type){
        case "sector": {
          this.sector = true
          this.supplier = false
          this.labelisation = false
          this.domaineList = []

          this.formRegister.get('categories')?.setValidators([Validators.required]);
          this.formRegister.get('categories')?.updateValueAndValidity();

          this.formRegister.get('restricted_suppliers')?.clearValidators();
          this.formRegister.get('restricted_suppliers')?.updateValueAndValidity();

          this.formRegister.get('restricted_label')?.clearValidators();
          this.formRegister.get('restricted_label')?.updateValueAndValidity();


          break
        }
        case "supplier":{
          this.sector = false
          this.supplier = true
          this.labelisation = false

          this.formRegister.get('restricted_suppliers')?.setValidators([Validators.required]);
          this.formRegister.get('restricted_suppliers')?.updateValueAndValidity();

          this.formRegister.get('restricted_label')?.clearValidators();
          this.formRegister.get('restricted_label')?.updateValueAndValidity();

          this.formRegister.get('categories')?.clearValidators();
          this.formRegister.get('categories')?.updateValueAndValidity();


          break
        }
        case "labelisation":{
          this.sector = false
          this.supplier = false
          this.labelisation = true

          this.formRegister.get('restricted_label')?.setValidators([Validators.required]);
          this.formRegister.get('restricted_label')?.updateValueAndValidity();

          this.formRegister.get('restricted_suppliers')?.clearValidators();
          this.formRegister.get('restricted_suppliers')?.updateValueAndValidity();

          this.formRegister.get('categories')?.clearValidators();
          this.formRegister.get('categories')?.updateValueAndValidity();


          break
        }
        default:
      }

  }


  onChangeDomaine(e: any){
    if(e.target.checked){
        this.domaineList.push(e.target.value)
    }else{
      let index = this.domaineList.findIndex(item => item=== e.target.value); //find index in your array
      this.domaineList.splice(index, 1);//remove element from array
    }

  }

  onCheckboxSuppliersChange(e: any) {
      console.log(e)
  }

  onSuppliersChange(e: any) {
    console.log(e.target.value)

  }

  onModaliteChange(e: any){
      let modalite = this.formRegister.get('modality')?.value
      console.log(modalite)
    modalite == "mail" ? this.emailEnvoie = true : this.emailEnvoie = false
  }
}
