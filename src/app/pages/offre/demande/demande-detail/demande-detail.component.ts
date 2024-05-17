import { Component } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {UntypedFormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {TypeDemandeService} from "../../../../core/services/type-demande.service";
import {DomaineActiviteService} from "../../../../core/services/domaine-activite.service";
import {FournisseurService} from "../../../../core/services/fournisseur.service";
import {BuyerService} from "../../../../core/services/buyer.service";
import {AuthentificationService} from "../../../../core/services/auth.service";
import {DemandeService} from "../../../../core/services/demande.service";
import {DocumentService} from "../../../../core/services/document.service";
import {Requests} from "../../../../core/models/requests.model";

@Component({
  selector: 'app-demande-detail',
  templateUrl: './demande-detail.component.html',
  styleUrls: ['./demande-detail.component.scss']
})
export class DemandeDetailComponent {

  menu = '';
  sousmenu = '';

  demande!: any;
  id = ''
  constructor(
    public toastService: ToastrService,
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private typeDemandeService: TypeDemandeService,
    private domaineActiviteService: DomaineActiviteService,
    private fournisseurService: FournisseurService,
    private buyerService: BuyerService,
    private authenticationService: AuthentificationService,
    private demandeService : DemandeService,
    private documentservice : DocumentService
  ) {
  }

  // bread crumb items
  breadCrumbItems!: Array<{}>;

  ngOnInit(): void {

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

    this.id = this.route.snapshot.params['id']
    this.demandeService.getSingleData(this.id).subscribe((data: Requests) =>{
      this.demande = data
    })

  }

}
