import { Component } from '@angular/core';
import {TypeSociete} from "../../../../core/models/type-societe.model";
import {ActivatedRoute, Router} from "@angular/router";
import {TypeSocieteService} from "../../../../core/services/type-societe.service";

@Component({
  selector: 'app-type-societe-detail',
  templateUrl: './type-societe-detail.component.html',
  styleUrls: ['./type-societe-detail.component.scss']
})
export class TypeSocieteDetailComponent {

  // bread crumb items
  breadCrumbItems!: Array<{}>;

  typeSociete!: TypeSociete;
  id = '';


  constructor(private route: ActivatedRoute,
              private router: Router,
              private typeSocieteService : TypeSocieteService) {

  }

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Agencies', active: true },
      { label: 'Overview', active: true }
    ];


    this.id = this.route.snapshot.params['id']

    this.typeSocieteService.getSingleData(this.id).subscribe((data: TypeSociete) =>{ this.typeSociete = data})



  }


}
