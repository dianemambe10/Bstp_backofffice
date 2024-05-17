import { Component } from '@angular/core';
import { ContratService } from 'src/app/core/services/contrat.service';
import {ToastrService} from "ngx-toastr";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contrat-detail',
  templateUrl: './contrat-detail.component.html',
  styleUrls: ['./contrat-detail.component.scss']
})
export class ContratDetailComponent {

  menu = '';
  sousmenu = '';

  contract!: any;
  id = ''

  constructor(
    public toastService: ToastrService,
    private route: ActivatedRoute,
    private contratService: ContratService
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
    this.contratService.getSingleData(this.id).subscribe((data: any) =>{
      this.contract = data
    })

  }


}
