import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AcheteurStepOneComponent } from '../acheteur-step-one/acheteur-step-one.component';
import { AcheteurStepTwoComponent } from '../acheteur-step-two/acheteur-step-two.component';
import { AcheteurStepEndComponent } from '../acheteur-step-end/acheteur-step-end.component';
import { Demandeur } from 'src/app/core/models/demandeur.model';
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



@Component({
  selector: 'app-acheteur-add',
  templateUrl: './acheteur-add.component.html',
  styleUrls: ['./acheteur-add.component.scss']
})
export class AcheteurAddComponent   {

  @ViewChild('stepOne')
  acheteurStepOneComponent!: FournisseurStepOneComponent;
  @ViewChild('stepTwo')
  acheteurStepTwoComponent!: FournisseurStepTwoComponent;

  @ViewChild('successContent', { static: false }) successContent?: ModalDirective;

  demandeur!: any;
  entreprise!: Buyer;
  entrepriseInfo!: Entreprise;
  entrepriseDocument!: Entreprise;
  listPrefecture: any;
  listeRegion: any;
  document!: any

  submitted = false;
  currentFile?: File;
  menu = '';
  sousmenu = '';


  // bread crumb items
  breadCrumbItems!: Array<{}>;


  modalRef?: BsModalRef;




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

    // Fetch Data

  }


  getData(){

    this.helperService.getCommmune().pipe(
      tap(this.helperService.getPrefecture().subscribe((data: Prefecture[]) => {
        this.listPrefecture = data
      })),
      tap(this.helperService.getRegion().subscribe((data: Region[]) => {
        this.listeRegion = data
      }))
    ).subscribe({
      next: (commune: Commune[]) => {
        this.dataService.setDataCommuneList$(commune)
        this.dataService.setDataPrefectureList$(this.listPrefecture)
        this.dataService.setDataRegionList$(this.listeRegion)
        let buyer : Buyer = new Buyer()
        this.dataService.setDataBuyer$(buyer)
        this.dataService.setDataUser$(buyer.user)

      }, error(er) {

      }
    })

    this.domaineActiviteService.getData().subscribe((data )=>{
      this.dataService.setDataDomaineList$(data)
    })

    this.typeSocieteService.getData().subscribe(data =>{
      this.dataService.setDataTypeList$(data)
    })

  }


  change(event: any) {


  }

  formEmitStep1(d: any){
    this.demandeur = d
    console.log(this.demandeur)
  }

  formEmitStep2(e: any){
    this.entrepriseInfo = e
    console.log(this.entreprise)
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

  test(){

    this.successContent?.show()

    this.toastService.error('Une erreur survenue', 'Erreur',{
      timeOut: 3000,
    })
  }


}
