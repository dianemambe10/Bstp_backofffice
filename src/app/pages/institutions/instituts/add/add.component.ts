import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Commune } from 'src/app/core/models/commune.model';
import { Prefecture } from 'src/app/core/models/prefecture.model';
import { Region } from 'src/app/core/models/region.model';
import { HelpsService } from 'src/app/core/services/helps.service';
import { InstitutService } from 'src/app/core/services/institut.service';
import { TypeInstitutService } from 'src/app/core/services/type-institut.service';

import {tap} from "rxjs/operators";
import { ListModel } from '../../type-instituts/List/list.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

 

  regionList =  [] as Region[];
  prefectureList= [] as Prefecture[];
  prefectureRegion = [] as Prefecture[];
  communeList = [] as Commune[];
  communePrefecture = [] as Commune[];

  regionDefault: number | undefined = 0;
  prefectureDefault: number | undefined = 0;
  communeDefault: number | undefined = 0;

  listPrefecture: any;
  listeRegion: any;
 
  public formRegister!: UntypedFormGroup;
  submitted = false;
  currentFile?: File;
  menu = '';
  sousmenu = '';
  typeInstitut = [] as ListModel[]

  constructor(
    public toastService: ToastrService,
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private institutService: InstitutService,
    private  helperService: HelpsService,
    private typeInstitutService: TypeInstitutService,
    ) {}


    // bread crumb items
    breadCrumbItems!: Array<{}>;

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
      /* setTimeout(() => {
         this.CoursesList.subscribe(x => {
           this.listData = Object.assign([], x);
         });
         document.getElementById('elmLoader')?.classList.add('d-none')
       }, 1000)

       */

      this.createForm()

      this. getData()

     }

  createForm(){

    this.formRegister = this.fb.group({
      name: ["",[Validators.required,Validators.minLength(3)]],
      type: ['', [Validators.required]],
      phone_number: ['', [Validators.required]],
      website: ['', []],
      email: ['', [Validators.required, Validators.email]],
      address: ['ratoma', []],
      region: ['0', []],
      prefecture: ['0', []],
      commune: ['0', []],
      description: ['', []],
      rccm: ['', [Validators.required]]
    });
  }

  
  getData(){

    this.helperService.getCommmune().pipe(
      tap(this.helperService.getPrefecture().subscribe((data: Prefecture[]) => {
        this.prefectureList = data
      })),
      tap(this.helperService.getRegion().subscribe((data: Region[]) => {
        this.regionList = data
      }))
    ).subscribe({
      next: (commune: Commune[]) => {
        this.communeList = commune

      }, error(er) {

      }
    })

    this.typeInstitutService.getData().subscribe((data )=>{
      this.typeInstitut = data
    })
  

  }

    get f2() { return this.formRegister.controls; }


    register(){
      if(this.formRegister.valid){



        this.institutService.postData(this.formRegister.value).subscribe({
          next: (res)=> {
            this.formRegister.reset()
            this.submitted= true;
            this.toastService.success('Nouvel  organisme a été ajouté avec success', 'Succèss',{
              timeOut: 3000,
            })
            this.router.navigate(['../organismes/organismes'])

          },
          error:(err)=>{
            this.toastService.error('Une erreur survenue', 'Erreur',{
              timeOut: 3000,
            })

          }
        })
      }else{

      }


    }

    cancel(e: Event){
      e.preventDefault()
      this.router.navigate(['../organismes/organismes'])

    }

    onRegionSelect(e: any, type: any = 0){
      let k = 0
      type? k= e : k = e.target.value
      //console.log(k)
      //console.log(this.prefectureList)
      this.prefectureRegion = this.prefectureList.filter((prefecture)=> prefecture.region!.id == k)
  
      console.log(this.prefectureRegion)
    }
  
    onPrefectureSelect(e: any, type: any = 0){
      let k = 0
      type? k= e : k = e.target.value
      console.log(k)
      console.log(this.communeList)
  
      this.communePrefecture= this.communeList.filter(commune=> commune.prefecture!.id == k)
      console.log(this.communePrefecture)
    }

}
