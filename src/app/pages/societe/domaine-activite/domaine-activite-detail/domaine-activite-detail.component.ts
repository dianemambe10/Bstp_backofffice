import { Component } from '@angular/core';
import {TypeSociete} from "../../../../core/models/type-societe.model";
import {ActivatedRoute, Router} from "@angular/router";
import {TypeSocieteService} from "../../../../core/services/type-societe.service";
import {DomaineActiviteService} from "../../../../core/services/domaine-activite.service";
import {DomaineActivite} from "../../../../core/models/domaine-activite.model";

@Component({
  selector: 'app-domaine-activite-detail',
  templateUrl: './domaine-activite-detail.component.html',
  styleUrls: ['./domaine-activite-detail.component.scss']
})
export class DomaineActiviteDetailComponent {


  // bread crumb items
  breadCrumbItems!: Array<{}>;

  domaine!: DomaineActivite;
  id = '';
  menu = '';
  sousmenu = '';


  constructor(private route: ActivatedRoute,
              private router: Router,
              private domaineActiviteService: DomaineActiviteService) {

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

    this.domaineActiviteService.getSingleData(this.id).subscribe((data: DomaineActivite) =>{ this.domaine = data})



  }


}
