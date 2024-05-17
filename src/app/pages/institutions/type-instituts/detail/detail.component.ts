import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeInstitutService } from 'src/app/core/services/type-institut.service';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

 // bread crumb items
 breadCrumbItems!: Array<{}>;

 thematique!: any;
 id = '';

 menu = '';
sousmenu = '';


 constructor(private route: ActivatedRoute,
             private router: Router,
             private typeInstitutService : TypeInstitutService) {

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

   this.typeInstitutService.getSingleData(this.id).subscribe((data: any) =>{ this.thematique = data})



 }

}
