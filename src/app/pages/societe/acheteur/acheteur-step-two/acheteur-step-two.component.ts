import {AfterViewInit, Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormBuilder, FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Entreprise } from 'src/app/core/models/entreprise.model';
import {Region} from "../../../../core/models/region.model";
import {Prefecture} from "../../../../core/models/prefecture.model";
import {Commune} from "../../../../core/models/commune.model";
import {DomaineActivite} from "../../../../core/models/domaine-activite.model";
import {TypeSociete} from "../../../../core/models/type-societe.model";
import {ToastrService} from "ngx-toastr";
import {DataService} from "../../../../core/services/data.service";
import {formatDate} from "@angular/common";
import {Buyer} from "../../../../core/models/buyer.model";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import Swal from "sweetalert2";

@Component({
  selector: 'app-acheteur-step-two',
  templateUrl: './acheteur-step-two.component.html',
  styleUrls: ['./acheteur-step-two.component.scss']
})
export class AcheteurStepTwoComponent implements AfterViewInit, OnInit {

  @Output() formTwo = new EventEmitter<Buyer>();
  public formStep2!: UntypedFormGroup;
  submitted = false;


  color: any;

  colorTheme: any = 'theme-blue';
  bsConfig?: Partial<BsDatepickerConfig>;

  regionList: Region[]=[];
  prefectureList: Prefecture[]=[];
  prefectureRegion: Prefecture[]=[];
  communeList: Commune[]=[];
  communePrefecture: Commune[]=[];
  domaineActivites: DomaineActivite[]=[];
  typeSocietes: TypeSociete[]=[];
  domaineList: number[]=[];
  entrepriseInfo!: Buyer;

  regionDefault: number | undefined = 0;
  prefectureDefault: number | undefined = 0;
  communeDefault: number | undefined = 0;


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



    this.dataService.selectedDataBuyer$.subscribe((buyer: any)=>{

      this.entrepriseInfo = buyer
      this.formStep2.controls['rccm'].setValue(buyer?.rccm)
      this.formStep2.controls['name'].setValue(buyer?.name)
      this.formStep2.controls['description'].setValue(buyer?.description)
      this.formStep2.controls['type'].setValue(buyer?.type?.id)
      this.formStep2.controls['registration_date'].setValue(buyer?.registration_date)
      this.formStep2.controls['email'].setValue(buyer?.email)
      this.formStep2.controls['phone_number'].setValue(buyer?.phone_number)
      this.formStep2.controls['website'].setValue(buyer?.website)
      this.formStep2.controls['address'].setValue(buyer?.address)
      this.formStep2.controls['region'].setValue(buyer?.region)
      this.formStep2.controls['prefecture'].setValue(buyer?.prefecture)
      this.formStep2.controls['commune'].setValue(buyer?.commune?.id)
      if(buyer?.logo)
        this.imageURL =  buyer?.logo
      this.regionDefault = <number> buyer?.region
      this.prefectureDefault = <number> buyer?.prefecture
      this.communeDefault = <number> buyer?.commune?.id

      this.onRegionSelect(this.regionDefault , 1)
      this.onPrefectureSelect(this.prefectureDefault, 1)

      this.entrepriseInfo.sectors?.forEach((dom : DomaineActivite) =>{
        this.domaineList.push(dom?.id!)
      })

    })

    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme, showWeekNumbers: false });





  }

  ngAfterViewInit(){
    //this.onRegionSelect(this.regionDefault, 1)
    //this.onPrefectureSelect(this.prefectureDefault, 1)
  }


  rccm = new FormControl('123654799999',[
    Validators.required,
    Validators.minLength(3)
  ])



  name = new FormControl('Agro Nafa',[
    Validators.required,
    Validators.minLength(3)
  ])

  sectors  = new FormControl('',[
      Validators.required,

    ] //, [this.emailTaken.validate]
  )

  description = new FormControl('AgroNafa est une entreprise agricule',[
    Validators.minLength(10)
  ])

  type = new FormControl('',[
    Validators.required
  ])

  registration_date = new FormControl('09/03/2022',[
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

  createForm(){

    this.formStep2 = this.fb.group({
      rccm : this.rccm,
      name : this.name,
      sectors  : this.sectors,
      description : this.description,
      type : this.type,
      registration_date : this.registration_date,
      email : this.email,
      phone_number : this.phone_number,
      website : this.website,
      address : this.address,
      region : this.region,
      prefecture : this.prefecture,
      commune : this.commune,
      // logo : this.logo,


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

    let yr = formatDate(this.formStep2.get('registration_date')?.value,'yyyy-MM-dd',"en-US")

    this.formStep2.get('registration_date')?.patchValue(yr)

    this.formStep2.get('sectors')?.patchValue(this.domaineList)
    this.formTwo.emit(this.formStep2.value)

  }

  onRegionSelect(e: any, type: any = 0){
    let k = 0
    type? k= e : k = e.target.value
    console.log("region: " + k)
    console.log(this.prefectureList)
    this.prefectureRegion = this.prefectureList.filter((prefecture)=> prefecture.region!.id == k)

    console.log(this.prefectureRegion)
  }

  onPrefectureSelect(e: any, type: any = 0){
    let k = 0
    type? k= e : k = e.target.value
    console.log("prefecture: " + k)
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
