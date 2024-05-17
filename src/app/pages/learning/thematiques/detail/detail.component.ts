import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ThematiqueService } from 'src/app/core/services/thematique.service';

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
 
 
   constructor(private route: ActivatedRoute,
               private router: Router,
               private thematiqueService : ThematiqueService) {
 
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
 
     this.thematiqueService.getSingleData(this.id).subscribe((data: any) =>{ this.thematique = data})
 
 
 
   }
 

}
