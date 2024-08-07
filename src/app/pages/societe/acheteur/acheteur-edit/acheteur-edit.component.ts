import {Component, ViewChild} from '@angular/core';
import {FormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Entreprise} from 'src/app/core/models/entreprise.model';
import {BsModalRef, ModalDirective} from "ngx-bootstrap/modal";
import {User} from "../../../../core/models/auth.models";
import {UserProfileService} from "../../../../core/services/user.service";
import {ToastrService} from "ngx-toastr";
import {DataService} from "../../../../core/services/data.service";
import {HelpsService} from "../../../../core/services/helps.service";
import {TypeSocieteService} from "../../../../core/services/type-societe.service";
import {DomaineActiviteService} from "../../../../core/services/domaine-activite.service";
import {Prefecture} from "../../../../core/models/prefecture.model";
import {Region} from "../../../../core/models/region.model";
import {Commune} from "../../../../core/models/commune.model";
import {BuyerService} from "../../../../core/services/buyer.service";
import {Buyer} from "../../../../core/models/buyer.model";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {DomaineActivite} from "../../../../core/models/domaine-activite.model";
import {TypeSociete} from "../../../../core/models/type-societe.model";
import {formatDate} from "@angular/common";
import Swal from "sweetalert2";


@Component({
  selector: 'app-acheteur-edit',
  templateUrl: './acheteur-edit.component.html',
  styleUrls: ['./acheteur-edit.component.scss']
})
export class AcheteurEditComponent {


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

  id!: number;
  userId!: number | undefined;
  entrepriseSlug!: string | undefined;

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


  buyerInformation = {} as Buyer

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



    this.formStep2 = this.fb.group({
      rccm: ['', [Validators.required]],
        name: ['', [Validators.required]],
        sectors: ['0', [Validators.required]],
        description: ['', []],
        type: ['', [Validators.required]],
        registration_date: ['', [Validators.required]],
        phone_number: ['', []],
        website: ['', []],
        email: ['', [Validators.required, Validators.email]],
        address: ['', []],
        region: ['0', []],
        prefecture: ['0', []],
        commune: ['0', []],
        slug: ['', []]
    })
  }


  civilites: Array<{ id: string, name: string }> = [
    { id: 'F', name: "Femme" },
    { id: 'M', name: "Homme" },
  ];

  get f1(){ return this.formStep1.controls  }
  get f2(){ return this.formStep2.controls  }



  getData(){

    this.id = this.route.snapshot.params['id']

   

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

  }

  setup(){
    this.id = this.route.snapshot.params['id']
    this.buyerService.getSingleData(this.id).subscribe((buyer: Buyer) => {
      this.userId = buyer.user?.id
      this.entrepriseSlug = buyer.slug
      this.entreprise = buyer
     
      this.formStep2.patchValue(buyer)
     
      if(buyer.registration_date){
        this.formStep2.get('registration_date')?.patchValue(formatDate(buyer.registration_date,'MM-dd-yyyy',"en-US"))
      }
  
      this.formStep2.get('commune')?.patchValue(buyer.commune?.id)
      this.formStep2.get('type')?.patchValue(buyer.type?.id)
      if(buyer?.logo)
        this.imageURL =  buyer?.logo
      this.regionDefault = <number> buyer?.region
      this.prefectureDefault = <number> buyer?.prefecture
      this.communeDefault = <number> buyer?.commune?.id
  
      this.onRegionSelect(this.regionDefault , 1)
      this.onPrefectureSelect(this.prefectureDefault, 1)
  
      buyer.sectors?.forEach((dom : DomaineActivite) =>{
        this.domaineList.push(dom?.id!)
      })

    })
   

  }

  selectedIndex =  0
  change(event: any) {
    this.selectedIndex = event?.selectedIndex

    console.log(event)

  }


  

  showAlert = false
  alertMsg = 'Please wait! Your account is being created.'
  alertColor = 'blue'







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

  messageArray = [] as any[]
  errorArray = [] as any[]
  keyArray = [] as any[]

  register(){

    let yr = formatDate(this.formStep2.get('registration_date')?.value,'yyyy-MM-dd',"en-US")
    this.formStep2.get('registration_date')?.patchValue(yr)
    this.formStep2.get('sectors')?.patchValue(this.domaineList)

    this.buyerService.patchData(this.formStep2.value).subscribe({
      next: (res: Buyer)=> {
        this.toastService.success('Un  acheteur a été modifié avec success', 'Succèss',{
          timeOut: 3000,
        })
        this.successContent?.show()
        this.router.navigate(['../societe/acheteurs'])
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
  cancel(e: Event) {
    e.preventDefault()
    this.router.navigate(['../societe/acheteurs'])

  }

}
