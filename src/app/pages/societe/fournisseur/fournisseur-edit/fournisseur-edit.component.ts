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





    this.helperService.getCommmune().subscribe((data: Commune[]) =>{
      this.communeList = data
    })

    this.domaineActiviteService.getData().subscribe((data )=>{
      this.domaineActivites = data
    })

    this.typeSocieteService.getData().subscribe(data =>{
      this.typeSocietes = data
    })

    this.id = this.route.snapshot.params['id']
    this.fournisseurService.getSingleData(this.id).subscribe( (entreprise: Entreprise) => {
      this.userId = entreprise.registered_by?.id
      this.entrepriseSlug = entreprise.slug
      this.entreprise = entreprise

      let user = entreprise.registered_by
      this.formStep1.controls['slug'].setValue(user?.slug)
      this.formStep1.controls['last_name'].setValue(user?.last_name)
      this.formStep1.controls['first_name'].setValue(user?.first_name)
      if(user?.date_of_birth)
          this.formStep1.controls['date_of_birth'].setValue(formatDate(user?.date_of_birth,'MM/dd/yyyy',"en-US"))
      this.formStep1.controls['gender'].setValue(user?.gender)
      this.formStep1.controls['phone_number'].setValue(user?.phone_number)
      this.formStep1.controls['email'].setValue(user?.email)
      this.formStep1.controls['role_dans_lentreprise'].setValue(user?.role_dans_lentreprise)

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

      this.actionnaireService.getMember(entreprise?.slug).subscribe((data: any[]) =>{
        this.actionnaireArray = data
      })

      this.commercialesService.getBySupplier(entreprise?.slug).subscribe((data: any[]) =>{
        this.referenceArray = data
      })

    })




    this.helperService.getCommmune().pipe(
      tap( this.helperService.getRegion().subscribe((data: Region[]) =>{
        this.regionList = data
       // this.formStep2.get('region')?.patchValue(0)
      })),
      tap( this.helperService.getPrefecture().subscribe((data: Prefecture[]) =>{
        this.prefectureList = data
      }))
    ).subscribe({
      next: (commune: Commune[]) =>{
        this.onRegionSelect(this.regionDefault,1)
        this.onPrefectureSelect(this.prefectureDefault,1)

      },error(er){

      }
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

  get f() { return this.formActionnaire.controls; }
  get ff() { return this.formReference.controls; }

  get f1(){ return this.formStep1.controls  }
  get f2(){ return this.formStep2.controls  }
  get f3(){ return this.formDocu.controls  }


  createForm(){

    this.formActionnaire = this.fb.group({
      id: [''],
      last_name: ['Mohamed', [Validators.required]],
      first_name: ['Diane', [Validators.required]],
      date_of_birth: ['11/02/2023', [Validators.required]],
      gender: ['M', [Validators.required]],
      phone_number: ['628492536', []],
      email: ['dianemambe@gmail.com', [Validators.required, Validators.email]],
      role_dans_lentreprise: ['PDG', []],
      username: ['', []],
      associate_percentage: ['62', [Validators.required]],
      nationality: ['', []]
    });

    this.formReference = this.fb.group({
      id: [''],
      company_name: ['Gac', [Validators.required]],
      contact_full_name: ['Mohamed Diane', [Validators.required]],
      contact_phone_number: ['628492536', []],
      contact_designation: ['dg', []],
      contact_email: ['dianemambe@gmail.com', [ Validators.email]],
      contact_approx_amount: ['1000000', []],
      reference: ['PDG', []],
      supplier: ['', []],
      doc: ['', []],
      contact_approx_amount_currency: ['FG', []]
    });

    this.formStep1 = this.fb.group({
      id: ['', []],
      last_name: ['Mohamed', [Validators.required]],
      first_name: ['Diane', [Validators.required]],
      date_of_birth: ['11/02/2023', [Validators.required]],
      gender: ['M', [Validators.required]],
      phone_number: ['628492536', []],
      email: ['dianemambe@gmail.com', [Validators.required, Validators.email]],
      role_dans_lentreprise: ['PDG', []],
      username: ['', []],
      slug: ['', []],
    });

    this.formStep2 = this.fb.group({
      id: ['', []],
      rccm: ['12336654789633', [Validators.required]],
      name: ['Dsoft', [Validators.required]],
      social_capital: ['100000', [Validators.required]],
      chiffre_affaire: ['100000', [Validators.required]],
      categories: ['0', [Validators.required]],
      description: ['une entreprise de developpement ', [Validators.required]],
      type: ['sarl', [Validators.required]],
      year_of_registration: ['11/02/2023', [Validators.required]],
      phone_number: ['628492536', [Validators.required]],
      website: ['https://www.micodus.net', []],
      email: ['dianemambe@gmail.com', [Validators.required, Validators.email]],
      address: ['ratoma', [Validators.required]],
      region: ['', [Validators.required]],
      prefecture: ['', [Validators.required]],
      commune: ['', [Validators.required]],
      slug: ['', []],
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
    let actionnaire = this.actionnaireArray.at(i)
   // console.log(actionnaire)
    this.formActionnaire.controls['last_name'].setValue(actionnaire?.last_name)
    this.formActionnaire.controls['first_name'].setValue(actionnaire?.first_name)
    this.formActionnaire.controls['gender'].setValue(actionnaire?.gender)
    this.formActionnaire.controls['date_of_birth'].setValue(actionnaire?.date_of_birth)
    this.formActionnaire.controls['phone_number'].setValue(actionnaire?.phone_number)
    this.formActionnaire.controls['email'].setValue(actionnaire?.email)
    this.formActionnaire.controls['associate_percentage'].setValue(actionnaire?.associate_percentage)
    this.formActionnaire.controls['nationality'].setValue(actionnaire?.nationality)
    this.formActionnaire.controls['role_dans_lentreprise'].setValue(actionnaire?.role)
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

  editReference(e: any, i: any){
    this.idDelete = e
    this.submitted = false
    this.modalAjoutTitle = "Editon d'une référence Commerciale"
    this.actsave = "edit"
    this.idDelete = i
    let reference = this.referenceArray.at(i)
    this.formReference.controls['company_name'].setValue(reference?.company_name)
    this.formReference.controls['contact_approx_amount'].setValue(reference?.contact_approx_amount)
    this.formReference.controls['reference'].setValue(reference?.reference)
    this.formReference.controls['contact_approx_amount_currency'].setValue(reference?.contact_approx_amount_currency)
    this.formReference.controls['contact_designation'].setValue(reference?.contact_designation)
    this.formReference.controls['contact_email'].setValue(reference?.contact_email)
    this.formReference.controls['contact_full_name'].setValue(reference?.contact_full_name)
    this.formReference.controls['contact_phone_number'].setValue(reference?.contact_phone_number)
    this.formReference.controls['contact_designation'].setValue(reference?.contact_designation)
    this.addReference?.show()
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
     // console.log(this.referenceArray)
      this.dataService.setReferenceList$(this.referenceArray)
      this.formReference.reset()
      this.submitted = false
      this.addReference?.hide()
    }
  }

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


    let data = { ...this.formStep1.value, ...{"id": this.userId}}
    this.userProfileService.patchData(data).subscribe({
      next: (res: User) => {
        let data = {...this.formStep2.value, ...this.formStep3.value, ...{"slug": this.entrepriseSlug}}
        this.fournisseurService.patchData(data).subscribe({


          next: (res: Entreprise) => {

            this.actionnaireArray.forEach((actionnaire: Actionnaire) =>{
              let data = { ...actionnaire, ...{"supplier": res.id}}
              this.actionnaireService.postData(data).subscribe(data => console.log(data))
            })

            this.referenceArray.forEach((commericiale: ReferenceCommericiale) =>{
              let data = { ...commericiale, ...{"supplier": res.id}}
              this.commercialesService.postData(data).subscribe(data => console.log(data))
            })

            this.succes = true

          /*  this.toastService.success('Modification effectuée avec success', 'Success', {
              timeOut: 3000,
            })*/
            //this.successContent?.show()
            //this.router.navigate(['../societe/fournisseurs'])

          },
          error: (err) => {
            this.handleError(err)
          }

        })
      },
      error: (err) => {
        this.handleError(err)
      }
    })
    // console.log(this.entrepriseInfo)
  }

  reload(e: any){
    window.location.reload()

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


