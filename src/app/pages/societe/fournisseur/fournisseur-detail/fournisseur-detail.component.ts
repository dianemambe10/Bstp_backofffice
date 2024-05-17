import { Component } from '@angular/core';
import { latLng, tileLayer, polygon, marker, circle } from 'leaflet';
import {Entreprise} from "../../../../core/models/entreprise.model";
import {FournisseurService} from "../../../../core/services/fournisseur.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ActionnaireService} from "../../../../core/services/actionnaire.service";
import {Actionnaire} from "../../../../core/models/actionnaire.model";
import {ReferenceCommericiale} from "../../../../core/models/referenceCommericiale.model";
import {CommercialesService} from "../../../../core/services/commerciales.service";
import {UserProfileService} from "../../../../core/services/user.service";
import {Demandeur} from "../../../../core/models/demandeur.model";

@Component({
  selector: 'app-fournisseur-detail',
  templateUrl: './fournisseur-detail.component.html',
  styleUrls: ['./fournisseur-detail.component.scss']
})

// Overview Component
export class FournisseurDetailComponent {

  // bread crumb items
  breadCrumbItems!: Array<{}>;



  bedroom: any;
  deleteID: any;
  currentTab: any = 'actionnaire';

  entreprise!: Entreprise;
  actionnaires = [] as Actionnaire[] ;
  users = [] as Demandeur[] ;
  references = [] as ReferenceCommericiale[];
  id = ''
  imageURL: string = './assets/images/users/user-dummy-img.jpg';
  constructor(private route: ActivatedRoute,

              private router: Router,
              private commercialesService : CommercialesService,
              private actionnaireService : ActionnaireService,
              private userProfileService : UserProfileService,
              private  fournisseurService: FournisseurService) {

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
    this.fournisseurService.getSingleData(this.id).subscribe((data: Entreprise) =>{
      this.entreprise = data
      this.actionnaireService.getMember(this.entreprise?.slug).subscribe((data: Actionnaire[]) =>{ this.actionnaires = data})
    this.commercialesService.getBySupplier (this.entreprise?.slug).subscribe((data: ReferenceCommericiale[]) =>{ this.references = data})
    this.userProfileService.getUserCollegue(this.entreprise?.slug).subscribe((data: Demandeur[]) =>{ this.users = data})
   
  })
    



  }

  options = { autoHide: false };



  // Change Tab Content
  changeTab(tab: string) {
    this.currentTab = tab;
  }

  /**
   * Markers Maps
   */
  markers = {
    layers: [
      tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidGhlbWVzYnJhbmQiLCJhIjoiY2xmbmc3bTV4MGw1ejNzbnJqOWpubzhnciJ9.DNkdZVKLnQ6I9NOz7EED-w",
        {
          maxZoom: 18,
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          id: "mapbox/streets-v11",
          tileSize: 512,
          zoomOffset: -1,
        }
      )
    ],
    zoom: 13,
    center: latLng(51.505, -0.09)
  };
  markersLayers = [
    circle([51.508, -0.11], { color: "#0ab39c", fillColor: "#0ab39c", radius: 500 }),
    polygon([[51.509, -0.08], [51.503, -0.06], [51.51, -0.047],], { color: "#405189", fillColor: "#405189" }),
    marker([51.5, -0.09])
  ];
}
