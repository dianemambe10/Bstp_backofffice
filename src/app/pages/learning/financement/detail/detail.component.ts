import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FinancementServices } from 'src/app/core/services/financement.service';

import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { reviews } from './data';
import { ordersModel } from 'src/app/pages/dashboards/index/index.model';
import { Observable } from 'rxjs';
import { IndexService } from 'src/app/pages/dashboards/index/index.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [IndexService, DecimalPipe]
})
export class DetailComponent implements OnInit {

 // bread crumb items
 breadCrumbItems!: Array<{}>;
 reviewForm!: UntypedFormGroup;
 reviewData: any;
 submitted: boolean = false;
 deleteId: any;
 files: File[] = [];
 rate: any;
 currentTab = 'description';

 // Table data
 LatestOrders!: Observable<ordersModel[]>;

 @ViewChild('addReview', { static: false }) addReview?: ModalDirective;
 @ViewChild('removeItemModal', { static: false }) removeItemModal?: ModalDirective;

 formation!: any;
 id = '';

 menu = '';
sousmenu = '';
formBuilder: any;
orderList!: any;


 constructor(private route: ActivatedRoute,
             private router: Router,
             private financementService : FinancementServices,
             private service: IndexService) {

              this.LatestOrders = service.countries$;

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

 

    // Fetch Data
    this.reviewData = reviews.reverse()


   this.id = this.route.snapshot.params['id']

   this.financementService.getSingleData(this.id).subscribe((data: any) =>{ this.formation = data})

   setTimeout(() => {
    this.LatestOrders.subscribe(x => {
      this.orderList = Object.assign([], x);
    });
    document.getElementById('elmLoader')?.classList.add('d-none')
  }, 1200)

 }
 // Change Tab Content
 changeTab(tab: string) {
  this.currentTab = tab;
}



public dropzoneConfig: DropzoneConfigInterface = {
  clickable: true,
  addRemoveLinks: true,
  previewsContainer: false,
};

uploadedFiles: any[] = [];

// File Upload
profile: any = [];
onUploadSuccess(event: any) {
  setTimeout(() => {
    this.uploadedFiles.push(event[0]);
    this.profile.push(event[0].dataURL)
    this.reviewForm.controls['img'].setValue(this.profile);
  }, 0);
}


// File Remove
removeFile(event: any) {
  this.uploadedFiles.splice(this.uploadedFiles.indexOf(event), 1);
}


// Edit Review
editReview(id: any) {
  this.uploadedFiles = []
  this.addReview?.show()
  this.reviewForm.controls['_id'].setValue(this.reviewData[id].id);
  this.reviewForm.controls['title'].setValue(this.reviewData[id].title);
  this.reviewForm.controls['rate'].setValue(this.reviewData[id].rating);
  this.reviewForm.controls['content'].setValue(this.reviewData[id].content);
  this.uploadedFiles = this.reviewData[id].profile
}

// Add Review
saveReview() {
  if (this.reviewForm.valid) {
    if (this.reviewForm.get('_id')?.value) {
      this.reviewData = reviews.map((order: { id: any; }) => order.id === this.reviewForm.get('_id')?.value ? { ...order, ...this.reviewForm.value } : order);
    } else {
      const title = this.reviewForm.get('title')?.value;
      const rating = this.reviewForm.get('rate')?.value;
      const content = this.reviewForm.get('content')?.value;
      const profile = this.reviewForm.get('img')?.value;

      this.reviewData.push({
        id: this.reviewData.length + 1,
        rating,
        title,
        content,
        date: '',
        user: '',
        profile: this.profile
      })
    }
    this.addReview?.hide()
    this.reviewForm.reset();
    this.uploadedFiles = [];
    this.profile = [];
  }
  this.submitted = true

}

// Delete Review
removeReview(id: any) {
  this.deleteId = id
  this.removeItemModal?.show()
}

DeleteReview() {
  this.reviewData.splice(this.deleteId, 1)
  this.removeItemModal?.hide()
}







}
