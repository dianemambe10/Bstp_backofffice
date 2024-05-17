import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InstitutService } from 'src/app/core/services/institut.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  
 // bread crumb items
 breadCrumbItems!: Array<{}>;

 institut!: any;
 id = '';

 menu = '';
sousmenu = '';


 constructor(private route: ActivatedRoute,
             private router: Router,
             private institutService : InstitutService) {

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

   this.institutService.getSingleData(this.id).subscribe((data: any) =>{ this.institut = data})



 }

}
