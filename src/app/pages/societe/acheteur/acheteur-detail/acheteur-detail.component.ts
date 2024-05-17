import { Component } from '@angular/core';
import {Actionnaire} from "../../../../core/models/actionnaire.model";
import {Demandeur} from "../../../../core/models/demandeur.model";
import {ReferenceCommericiale} from "../../../../core/models/referenceCommericiale.model";
import {ActivatedRoute, Router} from "@angular/router";
import {CommercialesService} from "../../../../core/services/commerciales.service";
import {ActionnaireService} from "../../../../core/services/actionnaire.service";
import {UserProfileService} from "../../../../core/services/user.service";
import {circle, latLng, marker, polygon, tileLayer} from "leaflet";
import {BuyerService} from "../../../../core/services/buyer.service";
import {Buyer} from "../../../../core/models/buyer.model";

@Component({
  selector: 'app-acheteur-detail',
  templateUrl: './acheteur-detail.component.html',
  styleUrls: ['./acheteur-detail.component.scss']
})
export class AcheteurDetailComponent {

  // bread crumb items
  breadCrumbItems!: Array<{}>;



  bedroom: any;
  deleteID: any;
  currentTab: any = 'actionnaire';

  buyer!: Buyer;
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
              private buyerService : BuyerService,) {

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
    this.buyerService.getSingleData(this.id).subscribe((data: Buyer) =>{
      this.buyer = data
    })
    this.actionnaireService.getData().subscribe((data: Actionnaire[]) =>{ this.actionnaires = data})
    this.commercialesService.getData().subscribe((data: ReferenceCommericiale[]) =>{ this.references = data})
    this.userProfileService.getData().subscribe((data: Demandeur[]) =>{ this.users = data})



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
