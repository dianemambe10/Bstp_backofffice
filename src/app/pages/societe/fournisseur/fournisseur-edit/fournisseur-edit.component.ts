import {  Component, ViewChild } from '@angular/core';
import { FormBuilder,  UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Entreprise } from 'src/app/core/models/entreprise.model';
import {UserProfileService} from "../../../../core/services/user.service";
import {ToastrService} from "ngx-toastr";
import {User} from "../../../../core/models/auth.models";
import {FournisseurService} from "../../../../core/services/fournisseur.service";

import Swal from 'sweetalert2';
import {BsModalRef,  ModalDirective} from "ngx-bootstrap/modal";
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
import {tap} from "rxjs/operators";
import { chatMessagesData } from '../fournisseur-add/data';
@Component({
  selector: 'app-fournisseur-edit',
  templateUrl: './fournisseur-edit.component.html',
  styleUrls: ['./fournisseur-edit.component.scss']
})
export class FournisseurEditComponent {

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


  modalRef?: BsModalRef;

  color: any;

  colorTheme: any = 'theme-blue';
  bsConfig?: Partial<BsDatepickerConfig>;


  messageArray = [] as any[]
  errorArray = [] as any[]
  keyArray = [] as any[]

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

  id!: number;
  userId!: number | undefined;
  entrepriseSlug!: string | undefined;

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
    private commercialesService : CommercialesService
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
          this.helperService.getRegion().subscribe((region: Region[]) => {
            this.regionList = region
            this.setup()
          
          })
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

  }

  /**
   * Stet actionnaire model
   */

  civilites: Array<{ id: string, name: string }> = [
    { id: 'F', name: "Femme" },
    { id: 'M', name: "Homme" },
  ];


  get f2(){ return this.formStep2.controls  }
  get f3(){ return this.formDocu.controls  }

  setup(){
    this.id = this.route.snapshot.params['id']
    this.fournisseurService.getSingleData(this.id).subscribe( (entreprise: Entreprise) => {
      this.userId = entreprise.registered_by?.id
      this.entrepriseSlug = entreprise.slug
      this.entreprise = entreprise

      let user = entreprise.registered_by
      

      this.formStep2.controls['slug'].setValue(entreprise?.slug)
      this.formStep2.controls['rccm'].setValue(entreprise?.rccm)
      this.formStep2.controls['name'].setValue(entreprise?.name)
      this.formStep2.controls['social_capital'].setValue(entreprise?.social_capital)
      this.formStep2.controls['chiffre_affaire'].setValue(entreprise?.chiffre_affaire!)
      this.formStep2.controls['description'].setValue(entreprise?.description)
      this.formStep2.controls['type'].setValue(entreprise?.type?.id)
      this.formStep2.controls['year_of_registration'].setValue(entreprise?.year_of_registration)
      this.formStep2.controls['year_of_registration'].setValue(formatDate(entreprise?.year_of_registration,'MM/dd/yyyy',"en-US"))

      this.formStep2.controls['email'].setValue(entreprise?.email)
      this.formStep2.controls['phone_number'].setValue(entreprise?.phone_number)
      this.formStep2.controls['website'].setValue(entreprise?.website)
      this.formStep2.controls['address'].setValue(entreprise?.address)
      this.formStep2.controls['region'].setValue(entreprise?.region?.id)
      this.formStep2.controls['prefecture'].setValue(entreprise?.prefecture?.id)
      this.formStep2.controls['commune'].setValue(entreprise?.commune?.id)
      if(entreprise?.logo)
        this.imageURL = entreprise?.logo
      this.regionDefault = entreprise?.region?.id
      this.prefectureDefault = entreprise?.prefecture?.id
      this.communeDefault = entreprise?.commune?.id

      this.onRegionSelect(this.regionDefault, 1)
      this.onPrefectureSelect(this.prefectureDefault, 1)

      this.entreprise.categories?.forEach((dom : DomaineActivite) =>{
        this.domaineList.push(dom?.id!)
      })


    })
  }


  createForm(){

   

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
        commune: ['', [Validators.required]],
        slug: ['', []]
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
    //console.log(k)
    //console.log(this.prefectureList)
    this.prefectureRegion = this.prefectureList.filter((prefecture)=> prefecture.region!.id == k)

  //  console.log(this.prefectureRegion)
  }

  onPrefectureSelect(e: any, type: any = 0){
    let k = 0
    type? k= e : k = e.target.value
    //console.log(k)
    //console.log(this.communeList)

    this.communePrefecture= this.communeList.filter(commune=> commune.prefecture!.id == k)
    //console.log(this.communePrefecture)
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





  onChangeFile(event: any, type: any){
    event.preventDefault()
  }

  device(e: any){
   // console.log(e)
    this.formReference.controls['contact_approx_amount'].setValue(e)

  }
  ngSelectChange(e: any){
   // console.log(e)
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
    
    let data = {...this.formStep2.value, ...this.formStep3.value}

    this.fournisseurService.patchData(data).subscribe({
      next: (res: User) => {

        this.succes = true
        
      },
      error: (err) => {
        this.handleError(err)
      }
    })
    // console.log(this.entrepriseInfo)
  }

  reload(e: any){
    this.router.navigate(['../societe/fournisseurs'])

  }


  nameRegion = (id: any) => this.regionList.find((r : Region) => r.id == id)?.name!

  namePrefecture = (id: any) => this.prefectureList.find((p : Prefecture) => p.id == id)?.name!

  nameCommune = (id: any) => this.communeList.find((c : Commune) => c.id == id)?.name!

  nametypeSociete = (id: any) =>  this.typeSocietes.find((c : TypeSociete) => c.id == id)?.name!

  nameDomaineActivite = (id: any) =>  this.domaineActivites.find((c : DomaineActivite) => c.id == id)?.name!

  listBuyer(e: Event){
    e.preventDefault()
    this.router.navigate(['../societe/fournisseurs']);
  }

  handleError(err: any){

    this.errorArray = err.error
    this.messageArray =  Object.values(err.error)
    this.keyArray =  Object.keys(err.error)
    this.errorContent?.show()
  }

}


