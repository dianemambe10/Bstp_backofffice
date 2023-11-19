import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, UntypedFormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AcheteurStepOneComponent} from '../acheteur-step-one/acheteur-step-one.component';
import {AcheteurStepTwoComponent} from '../acheteur-step-two/acheteur-step-two.component';
import {AcheteurStepEndComponent} from '../acheteur-step-end/acheteur-step-end.component';
import {Demandeur} from 'src/app/core/models/demandeur.model';
import {Entreprise} from 'src/app/core/models/entreprise.model';
import {FournisseurStepOneComponent} from "../../fournisseur/fournisseur-step-one/fournisseur-step-one.component";
import {FournisseurStepTwoComponent} from "../../fournisseur/fournisseur-step-two/fournisseur-step-two.component";
import {FournisseurStepThreeComponent} from "../../fournisseur/fournisseur-step-three/fournisseur-step-three.component";
import {BsModalRef, ModalDirective} from "ngx-bootstrap/modal";
import {User} from "../../../../core/models/auth.models";
import {UserProfileService} from "../../../../core/services/user.service";
import {ToastrService} from "ngx-toastr";
import {FournisseurService} from "../../../../core/services/fournisseur.service";
import {DataService} from "../../../../core/services/data.service";
import {HelpsService} from "../../../../core/services/helps.service";
import {TypeSocieteService} from "../../../../core/services/type-societe.service";
import {DomaineActiviteService} from "../../../../core/services/domaine-activite.service";
import {tap} from "rxjs/operators";
import {Prefecture} from "../../../../core/models/prefecture.model";
import {Region} from "../../../../core/models/region.model";
import {Commune} from "../../../../core/models/commune.model";
import {BuyerService} from "../../../../core/services/buyer.service";
import {Buyer} from "../../../../core/models/buyer.model";


@Component({
  selector: 'app-acheteur-edit',
  templateUrl: './acheteur-edit.component.html',
  styleUrls: ['./acheteur-edit.component.scss']
})
export class AcheteurEditComponent {


  @ViewChild('stepOne') fournisseurStepOneComponent!: FournisseurStepOneComponent;
  @ViewChild(FournisseurStepTwoComponent) fournisseurStepTwoComponent!: FournisseurStepTwoComponent;
  @ViewChild(FournisseurStepThreeComponent) fournisseurStepThreeComponent!: FournisseurStepThreeComponent;

  @ViewChild('successContent', {static: false}) successContent?: ModalDirective;

  get frmStepOne() {
    return this.fournisseurStepOneComponent ? this.fournisseurStepOneComponent.formStep1 : null;
  }

  get frmStepTwo() {
    return this.fournisseurStepTwoComponent ? this.fournisseurStepTwoComponent.formStep2 : null;
  }

  get frmStepThree() {
    return this.fournisseurStepThreeComponent ? this.fournisseurStepThreeComponent.formStep3 : null;
  }


  demandeur!: User
  entreprise!: any;
  entrepriseInfo!: Entreprise;
  entrepriseDocument!: Entreprise;
  id!: number;
  userId!: number | undefined;
  entrepriseSlug!: string | undefined;
  document!: any

  submitted = false;
  currentFile?: File;
  menu = '';
  sousmenu = '';

  listCommune: any;
  listPrefecture: any;
  listeRegion: any;
  buyer!: Buyer;

  // bread crumb items
  breadCrumbItems!: Array<{}>;


  modalRef?: BsModalRef;


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userProfileService: UserProfileService,
    public toastService: ToastrService,
    private buyerService: BuyerService,
    private dataService: DataService,
    private helperService: HelpsService,
    private typeSocieteService: TypeSocieteService,
    private domaineActiviteService: DomaineActiviteService,
  ) {
  }


  ngOnInit(): void {

    this.route.data.subscribe((data) => {
      const {menu, sousmenu} = data
      this.menu = menu
      this.sousmenu = sousmenu
    })

    this.domaineActiviteService.getData().subscribe((data) => {
      this.dataService.setDataDomaineList$(data)
    })

    this.typeSocieteService.getData().subscribe(data => {
      this.dataService.setDataTypeList$(data)
    })

    this.id = this.route.snapshot.params['id']


    this.helperService.getCommmune().pipe(
      tap(this.buyerService.getSingleData(this.id).subscribe((buyer: Buyer) => {
        this.userId = buyer.user?.id
        this.entrepriseSlug = buyer.slug
        this.entreprise = buyer
       })),
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
        this.dataService.setDataBuyer$(this.entreprise)
        this.dataService.setDataUser$(this.entreprise.user)

      }, error(er) {

      }
    })


    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      {label: this.menu, active: true},
      {label: this.sousmenu, active: true}
    ];
  }


  change(event: any) {


  }

  formEmitStep1(d: User) {
    this.demandeur = d
    console.log(this.demandeur)
  }

  formEmitStep2(e: Buyer) {
    this.buyer = e
    console.log(this.entreprise)
  }

  formEmitStep3(d: Entreprise) {

    this.entrepriseDocument = d
  }

  formEmitEnd(e: any) {

    console.log(this.demandeur)
    let data = {...this.demandeur, ...{"id": this.userId}}
    this.userProfileService.patchData(data).subscribe({
      next: (res: User) => {
        let data = {...this.buyer, ...{"slug": this.entrepriseSlug}}
        this.buyerService.patchData(data).subscribe({


          next: (res: Entreprise) => {

            this.toastService.success('Modification effectuée avec success', 'Success', {
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
      error: (err) => {
        console.log(err.messages)
      }
    })
    // console.log(this.entrepriseInfo)

  }

  showAlert = false
  alertMsg = 'Please wait! Your account is being created.'
  alertColor = 'blue'

  test() {

    this.successContent?.show()

    this.toastService.error('Une erreur survenue', 'Erreur', {
      timeOut: 3000,
    })
  }


}
