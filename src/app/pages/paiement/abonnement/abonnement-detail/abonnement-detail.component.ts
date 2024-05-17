import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModePayement } from 'src/app/core/models/mode-payement.model';
import { AbonnementService } from 'src/app/core/services/abonnement.service';
import { ModePayementService } from 'src/app/core/services/mode-payement.service';

@Component({
  selector: 'app-abonnement-detail',
  templateUrl: './abonnement-detail.component.html',
  styleUrls: ['./abonnement-detail.component.css']
})
export class AbonnementDetailComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;

  payement!: any;
  id = '';
  menu = '';
  sousmenu = '';


  constructor(private route: ActivatedRoute,
              private router: Router,
              private abonnementService: AbonnementService,) {

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

    this.abonnementService.getSingleData(this.id).subscribe((data: ModePayement) =>{ this.payement = data})



  }

}
