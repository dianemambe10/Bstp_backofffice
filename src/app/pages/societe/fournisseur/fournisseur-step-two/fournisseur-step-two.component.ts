import {AfterViewInit, Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormBuilder, FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Entreprise } from 'src/app/core/models/entreprise.model';
import {Region} from "../../../../core/models/region.model";
import {Prefecture} from "../../../../core/models/prefecture.model";
import {Commune} from "../../../../core/models/commune.model";
import {HelpsService} from "../../../../core/services/helps.service";
import {DomaineActivite} from "../../../../core/models/domaine-activite.model";
import {TypeSociete} from "../../../../core/models/type-societe.model";
import {TypeSocieteService} from "../../../../core/services/type-societe.service";
import {DomaineActiviteService} from "../../../../core/services/domaine-activite.service";
import {ToastrService} from "ngx-toastr";
import { formatDate } from '@angular/common';
import {DataService} from "../../../../core/services/data.service";
import {User} from "../../../../core/models/auth.models";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import Swal from "sweetalert2";


@Component({
  selector: 'app-fournisseur-step-two',
  templateUrl: './fournisseur-step-two.component.html',
  styleUrls: ['./fournisseur-step-two.component.scss']
})
export class FournisseurStepTwoComponent implements AfterViewInit, OnInit {

  @Output() formTwo = new EventEmitter<Entreprise>();
  public formStep2!: UntypedFormGroup;
  submitted = false;

  regionList: Region[]=[];
  prefectureList: Prefecture[]=[];
  prefectureRegion: Prefecture[]=[];
  communeList: Commune[]=[];
  communePrefecture: Commune[]=[];
  domaineActivites: DomaineActivite[]=[];
  typeSocietes: TypeSociete[]=[];
  domaineList: number[]=[];
  entrepriseInfo!: Entreprise;

  regionDefault: number | undefined = 0;
  prefectureDefault: number | undefined = 0;
  communeDefault: number | undefined = 0;

  color: any;

  colorTheme: any = 'theme-blue';
  bsConfig?: Partial<BsDatepickerConfig>;

  // File Upload
  imageURL: string = './assets/images/defaultlogo.png';


  constructor(
    private fb: UntypedFormBuilder,
    public toastService: ToastrService,
    private dataService: DataService
  ) {}


  ngOnInit(): void {
    this.createForm()

    this.dataService.selectedDataRegionList$.subscribe((reg: Region[]) =>{
      this.regionList = reg
    })

    this.dataService.selectedDataPrefectureList$.subscribe((pre: Prefecture[]) =>{
      this.prefectureList = pre
    })

    this.dataService.selectedDataCommuneList$.subscribe((com: Commune[]) =>{
      this.communeList = com
    })

    this.dataService.selectedDataDomainList$.subscribe((dom: DomaineActivite[]) =>{
      this.domaineActivites = dom
    })

    this.dataService.selectedDatatypeList$.subscribe((typ: TypeSociete[]) =>{
      this.typeSocietes = typ
    })



    this.dataService.selectedDataEntreprise$.subscribe((entreprise: Entreprise)=>{
      this.entrepriseInfo = entreprise
      this.formStep2.controls['rccm'].setValue(entreprise?.rccm)
      this.formStep2.controls['name'].setValue(entreprise?.name)
      this.formStep2.controls['description'].setValue(entreprise?.description)
      this.formStep2.controls['type'].setValue(entreprise?.type?.id)
      this.formStep2.controls['year_of_registration'].setValue(entreprise?.year_of_registration)
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

      this.entrepriseInfo.categories?.forEach((dom : DomaineActivite) =>{
        this.domaineList.push(dom?.id!)
      })
      //console.log(this.domaineList)

    })

    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme, showWeekNumbers: false });




  }

  ngAfterViewInit(){
    //this.onRegionSelect(this.regionDefault, 1)
    //this.onPrefectureSelect(this.prefectureDefault, 1)
  }
/*

  rccm = new FormControl('123654799999',[
    Validators.required,
    Validators.minLength(3)
  ])



  name = new FormControl('Agro Nafa',[
    Validators.required,
    Validators.minLength(3)
  ])

  categories  = new FormControl('',[
    Validators.required,

  ] //, [this.emailTaken.validate]
  )

  description = new FormControl('AgroNafa est une entreprise agricule',[
    Validators.minLength(10)
  ])

  type = new FormControl('',[
    Validators.required
  ])

  year_of_registration = new FormControl('09/03/2022',[
    Validators.required,
    //Validators.pattern(/^(0?[1-9]|1[0-2])[\/](0?[1-9]|[12]\d|3[01])[\/](19|20)\d{2}$/)
  ])

  email = new FormControl('info@agronafa.com',[
    Validators.required,
    Validators.email,
    ] //, [this.emailTaken.validate]
  )
  phone_number = new FormControl('628494516',[
    Validators.required,

  ] //, [this.emailTaken.validate]
  )
  website = new FormControl('https://www.micodus.net',[
    //Validators.pattern(/(?:https?:\/\/(?:www\.)?|www\.)?[a-z0-9]+(?:[-.][a-z0-9]+)*\.[a-z]{2,5}(?::[0-9]{1,5})?(?:\/\S*)?$/g)
  ] //, [this.emailTaken.validate]
  )

  address = new FormControl('taouya',[
    Validators.required,

  ] //, [this.emailTaken.validate]
  )

  region = new FormControl('',[
    Validators.required,

  ])

  prefecture = new FormControl('',[
    Validators.required,

  ])

  commune = new FormControl('',[
    Validators.required,

  ])
  logo = new FormControl(null,[Validators.nullValidator])

 // logoFile = new FormControl('', [Validators.nullValidator]);

 */


  createForm(){

  /*  this.formStep2 = this.fb.group({
      rccm : this.rccm,
      name : this.name,
      categories  : this.categories,
      description : this.description,
      type : this.type,
      year_of_registration : this.year_of_registration,
      email : this.email,
      phone_number : this.phone_number,
      website : this.website,
      address : this.address,
      region : this.region,
      prefecture : this.prefecture,
      commune : this.commune,
     // logo : this.logo,


    });*/

    this.formStep2 = this.fb.group({
      rccm: ['Mohamed', [Validators.required]],
      name: ['Diane', [Validators.required]],
      categories: ['Diane', [Validators.required]],
      description: ['Diane', []],
      type: ['Diane', [Validators.required]],
      year_of_registration: ['1990/02/02', [Validators.required]],
      phone_number: ['628492536', []],
      website: ['https://www.micodus.net', []],
      email: ['dianemambe@gmail.com', [Validators.required, Validators.email]],
      address: ['PDG', []],
      region: ['', []],
      prefecture: ['', []],
      commune: ['', []]
    });
  }

  get f() { return this.formStep2.controls; }



  onImageSelected(file: File){


    this.formStep2.patchValue({logoFile: file})
    console.log(this.formStep2)

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

  firstTwo(){

    let yr = formatDate(this.formStep2.get('year_of_registration')?.value,'yyyy-MM-dd',"en-US")

    this.formStep2.get('year_of_registration')?.patchValue(yr)

    this.formStep2.get('categories')?.patchValue(this.domaineList)
    this.formTwo.emit(this.formStep2.value)

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
      if(this.domaineList.length < 5)
        this.domaineList.push(e.target.value)
      else{
        e.target.checked = false
        Swal.fire({ text: 'Vous avez atteint le nombre maximal de domaine d\'activité', confirmButtonColor: '#4b93ff', showCancelButton: false, });

      }

      }else{
          let index = this.domaineList.findIndex(item => item=== e.target.value); //find index in your array
          this.domaineList.splice(index, 1);//remove element from array
       }


  }


}
