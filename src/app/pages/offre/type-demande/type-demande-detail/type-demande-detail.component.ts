import { Component } from '@angular/core';
import {DomaineActivite} from "../../../../core/models/domaine-activite.model";
import {ActivatedRoute, Router} from "@angular/router";
import {DomaineActiviteService} from "../../../../core/services/domaine-activite.service";
import {TypeDemandeService} from "../../../../core/services/type-demande.service";
import {TypeDemande} from "../../../../core/models/type-demande.model";

@Component({
  selector: 'app-type-demande-detail',
  templateUrl: './type-demande-detail.component.html',
  styleUrls: ['./type-demande-detail.component.scss']
})
export class TypeDemandeDetailComponent {


  // bread crumb items
  breadCrumbItems!: Array<{}>;

  typeDemande!: TypeDemande;
  id = '';
  menu = '';
  sousmenu = '';


  constructor(private route: ActivatedRoute,
              private router: Router,
              private typeDemandeService: TypeDemandeService) {

  }

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


    this.id = this.route.snapshot.params['id']

    this.typeDemandeService.getSingleData(this.id).subscribe((data: TypeDemande) =>{ this.typeDemande = data})



  }


}
