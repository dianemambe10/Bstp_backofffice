import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { ModePayement } from 'src/app/core/models/mode-payement.model';
import { ModePayementService } from 'src/app/core/services/mode-payement.service';

@Component({
  selector: 'app-mode-payement-detail',
  templateUrl: './mode-payement-detail.component.html',
  styleUrls: ['./mode-payement-detail.component.scss']
})
export class ModePayementDetailComponent {


  // bread crumb items
  breadCrumbItems!: Array<{}>;

  modePayement!: ModePayement;
  id = '';
  menu = '';
  sousmenu = '';


  constructor(private route: ActivatedRoute,
              private router: Router,
              private modePayementService: ModePayementService) {

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

    this.modePayementService.getSingleData(this.id).subscribe((data: ModePayement) =>{ this.modePayement = data})



  }


}
