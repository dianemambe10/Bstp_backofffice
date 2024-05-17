import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Entreprise } from 'src/app/core/models/entreprise.model';
import {FournisseurStepOneComponent} from "../../fournisseur/fournisseur-step-one/fournisseur-step-one.component";
import {FournisseurStepTwoComponent} from "../../fournisseur/fournisseur-step-two/fournisseur-step-two.component";
import {BsModalRef, ModalDirective} from "ngx-bootstrap/modal";
import {UserProfileService} from "../../../../core/services/user.service";
import {ToastrService} from "ngx-toastr";
import {FournisseurService} from "../../../../core/services/fournisseur.service";
import {DataService} from "../../../../core/services/data.service";
import {HelpsService} from "../../../../core/services/helps.service";
import {TypeSocieteService} from "../../../../core/services/type-societe.service";
import {DomaineActiviteService} from "../../../../core/services/domaine-activite.service";
import {Region} from "../../../../core/models/region.model";
import {Prefecture} from "../../../../core/models/prefecture.model";
import {Commune} from "../../../../core/models/commune.model";
import {User} from "../../../../core/models/auth.models";
import {BuyerService} from "../../../../core/services/buyer.service";
import {tap} from "rxjs/operators";
import {Buyer} from "../../../../core/models/buyer.model";
import {Actionnaire} from "../../../../core/models/actionnaire.model";
import {ReferenceCommericiale} from "../../../../core/models/referenceCommericiale.model";
import {TypeSociete} from "../../../../core/models/type-societe.model";
import {DomaineActivite} from "../../../../core/models/domaine-activite.model";
import {formatDate} from "@angular/common";
import Swal from "sweetalert2";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {messageErreur} from "../../../../core/models/message-erreur.model";
import {array} from "@amcharts/amcharts5";



@Component({
  selector: 'app-acheteur-add',
  templateUrl: './acheteur-add.component.html',
  styleUrls: ['./acheteur-add.component.scss']
})
export class AcheteurAddComponent   {


  @ViewChild('successContent', { static: false }) successContent?: ModalDirective;
  @ViewChild('errorContent', { static: false }) errorContent?: ModalDirective;

  demandeur = {} as  any;
  entreprise = {} as  any;
  entrepriseInfo!: Entreprise;
  entrepriseDocument!: Entreprise;
  listPrefecture: any;
  listeRegion: any;
  document!: any

  submitted = false;
  currentFile?: File;
  menu = '';
  sousmenu = '';

  public formStep1!: UntypedFormGroup;
  public formStep2!: UntypedFormGroup;
  // bread crumb items
  breadCrumbItems!: Array<{}>;

  colorTheme: any = 'theme-blue';
  bsConfig?: Partial<BsDatepickerConfig>;
  succes = false

  modalRef?: BsModalRef;

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

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userProfileService : UserProfileService,
    public toastService: ToastrService,
    private buyerService : BuyerService,
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

    this.getData()

    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: this.menu, active: true },
      { label: this.sousmenu, active: true }
    ];

    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme, showWeekNumbers: false });


  }

  createForm(){


    this.formStep1 = this.fb.group({
      last_name: ['Mohamed', [Validators.required]],
      first_name: ['Diane', [Validators.required]],
      date_of_birth: ['11/02/2023', [Validators.required]],
      gender: ['M', [Validators.required]],
      phone_number: ['628492536', []],
      email: ['dianemambe@gmail.com', [Validators.required, Validators.email]],
      role_dans_lentreprise: ['PDG', []],
      username: ['', []],
    });

    this.formStep2 = this.fb.group({
      rccm: ['12336654789633', [Validators.required]],
      name: ['Dsoft', [Validators.required]],
      sectors: ['0', [Validators.required]],
      description: ['une entreprise de developpement ', []],
      type: ['sarl', [Validators.required]],
      registration_date: ['11/02/2023', [Validators.required]],
      phone_number: ['628492536', []],
      website: ['https://www.micodus.net', []],
      email: ['dianemambe@gmail.com', [Validators.required, Validators.email]],
      address: ['ratoma', []],
      region: ['0', []],
      prefecture: ['0', []],
      commune: ['0', []]
    });

  }

  civilites: Array<{ id: string, name: string }> = [
    { id: 'F', name: "Femme" },
    { id: 'M', name: "Homme" },
  ];

  get f1(){ return this.formStep1.controls  }
  get f2(){ return this.formStep2.controls  }


  getData(){

    this.helperService.getCommmune().pipe(
      tap(this.helperService.getPrefecture().subscribe((data: Prefecture[]) => {
        this.prefectureList = data
      })),
      tap(this.helperService.getRegion().subscribe((data: Region[]) => {
        this.regionList = data
      }))
    ).subscribe({
      next: (commune: Commune[]) => {
        this.communeList = commune

      }, error(er) {

      }
    })

    this.domaineActiviteService.getData().subscribe((data )=>{
      this.domaineActivites = data
    })

    this.typeSocieteService.getData().subscribe(data =>{
      this.typeSocietes = data
    })

  }

  selectedIndex =  0
  change(event: any) {
    this.selectedIndex = event?.selectedIndex

    console.log(event)

  }


  formEmitStep1(d: any){
    this.demandeur = d
  }

  formEmitStep2(e: any){
    this.regionList = e
  }
  formEmitEnd(e: any){

    this.userProfileService.postData(this.demandeur).subscribe({
      next: (res: User)=> {
        let data = {...this.entrepriseInfo,  ...{"user": res.id}}
        //console.log(data)

        this.buyerService.postData(data).subscribe({
          next: (res: Entreprise) => {

            this.toastService.success('Un nouveau acheteur a été ajouté avec success', 'Succèss',{
              timeOut: 3000,
            })
            this.successContent?.show()
            this.router.navigate(['../societe/acheteurs'])

          },
          error: (err) => {
            console.log(err.messages)
            this.toastService.error('Une erreur survenue', 'Erreur', {
              timeOut: 3000,
            })

          }
        })
      },
      error:(err)=>{
        console.log(err.messages)
        this.toastService.error('Une erreur survenue', 'Erreur',{
          timeOut: 3000,
        })

      }
    })


  }

  showAlert = false
  alertMsg = 'Please wait! Your account is being created.'
  alertColor = 'blue'







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
    let yr = formatDate(this.formStep2.get('registration_date')?.value,'yyyy-MM-dd',"en-US")
    this.formStep2.get('registration_date')?.patchValue(yr)
    this.formStep2.get('sectors')?.patchValue(this.domaineList)

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

    console.log(this.prefectureRegion)
  }

  onPrefectureSelect(e: any, type: any = 0){
    let k = 0
    type? k= e : k = e.target.value
    console.log(k)
    console.log(this.communeList)

    this.communePrefecture= this.communeList.filter(commune=> commune.prefecture!.id == k)
    console.log(this.communePrefecture)
  }

  onChangeDomaine(e: any){
    if(e.target.checked){
      if(this.domaineList.length < 5){
        this.domaineList.push(e.target.value)
        this.formStep2.get('sectors')?.patchValue(this.domaineList)
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



  save(e: any){

    e.preventDefault()


    this.userProfileService.postData(this.formStep1.value).subscribe({
      next: (res: User)=> {
        let data = {...this.formStep2.value,  ...{"user": res.id}}
        //console.log(data)

        this.buyerService.postData(data).subscribe({
          next: (res: Entreprise) => {

            this.toastService.success('Un nouveau acheteur a été ajouté avec success', 'Succèss',{
              timeOut: 3000,
            })
            this.successContent?.show()
            this.router.navigate(['../societe/acheteurs'])

          },
          error: (err) => {
            this.userProfileService.delete(res.id).subscribe()
            this.handleError(err)
          }
        })
      },
      error:(err)=>{
        //console.log(err.error)
        //
       this.handleError(err)

      }
    })

  }

  handleError(err: any){

    this.errorArray = err.error
    this.messageArray =  Object.values(err.error)
    this.keyArray =  Object.keys(err.error)
    this.errorContent?.show()
  }

  reload(e: any){
   // window.location.reload()
    this.formStep1.patchValue({})
    this.formStep2.patchValue({})


  }


  nameRegion = (id: any) => this.regionList.find((r : Region) => r.id == id)?.name!

  namePrefecture = (id: any) => this.prefectureList.find((p : Prefecture) => p.id == id)?.name!

  nameCommune = (id: any) => this.communeList.find((c : Commune) => c.id == id)?.name!

  nametypeSociete = (id: any) =>  this.typeSocietes.find((c : TypeSociete) => c.id == id)?.name!

  nameDomaineActivite = (id: any) =>  this.domaineActivites.find((c : DomaineActivite) => c.id == id)?.name!

  previewStep2 = (e: any) =>{
    e.preventDefault()
    let yr = formatDate(this.formStep2.get('registration_date')?.value,'MM-dd-yyyy',"en-US")
    this.formStep2.get('registration_date')?.patchValue(yr)
  }

  protected readonly array = array;
}
