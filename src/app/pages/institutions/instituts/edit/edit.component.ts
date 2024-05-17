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
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

   

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
  id!: number;
  institut!: any;

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
      phone_number: ['628492536', []],
      website: ['https://www.micodus.net', []],
      email: ['dianemambe@gmail.com', [Validators.required, Validators.email]],
      address: ['ratoma', []],
      region: ['0', []],
      prefecture: ['0', []],
      commune: ['0', []]
    });
  }

  
  getData(){

    this.id = this.route.snapshot.params['id']

    this.institutService.getSingleData(this.id).subscribe((data: any)=>{
      this.institut = data
      this.formRegister.controls['id'].setValue(this.institut.id)
      this.formRegister.controls['name'].setValue(this.institut.name)
      this.formRegister.controls['type'].setValue(this.institut.type)
      this.formRegister.controls['phone_number'].setValue(this.institut.phone_number)
      this.formRegister.controls['website'].setValue(this.institut.website)
      this.formRegister.controls['address'].setValue(this.institut.address)
      this.formRegister.controls['region'].setValue(this.institut.region)
      this.formRegister.controls['prefecture'].setValue(this.institut.prefecture)
      this.formRegister.controls['commune'].setValue(this.institut.commune)


      this.regionDefault = <number> this.institut?.region
      this.prefectureDefault = <number> this.institut?.prefecture
      this.communeDefault = <number> this.institut?.commune?.id
  
      this.onRegionSelect(this.regionDefault , 1)
      this.onPrefectureSelect(this.prefectureDefault, 1)

    })

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



        this.institutService.patchData(this.formRegister.value).subscribe({
          next: (res)=> {
            this.formRegister.reset()
            this.submitted= true;
            this.toastService.success('Un  institut a été modifié avec success', 'Succèss',{
              timeOut: 3000,
            })
            this.router.navigate(['../institution/instituts'])

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
      this.router.navigate(['../institution/instituts'])

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
