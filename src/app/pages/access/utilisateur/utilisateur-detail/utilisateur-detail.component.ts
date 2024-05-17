import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserProfileService} from "../../../../core/services/user.service";
import {Demandeur} from "../../../../core/models/demandeur.model";

@Component({
  selector: 'app-utilisateur-detail',
  templateUrl: './utilisateur-detail.component.html',
  styleUrls: ['./utilisateur-detail.component.scss']
})
export class UtilisateurDetailComponent {

  // bread crumb items
  breadCrumbItems!: Array<{}>;

  user!: Demandeur;
  id = '';
  imageURL: string = './assets/images/users/user-dummy-img.jpg';


  constructor(private route: ActivatedRoute,
              private router: Router,
               private userProfileService : UserProfileService) {

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

    this.userProfileService.getSingleData(this.id).subscribe((data: Demandeur) =>{ this.user = data})



  }



}
