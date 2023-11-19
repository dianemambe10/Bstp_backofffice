
import { Component } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {DomaineActiviteService} from "../../../../core/services/domaine-activite.service";
import {DomaineActivite} from "../../../../core/models/domaine-activite.model";


@Component({
  selector: 'app-domaine-activite-edit',
  templateUrl: './domaine-activite-edit.component.html',
  styleUrls: ['./domaine-activite-edit.component.scss']
})
export class DomaineActiviteEditComponent {

  public formRegister!: UntypedFormGroup;
  submitted = false;
  currentFile?: File;
  menu = '';
  sousmenu = '';
  id!: number;
  domaineActivite!: DomaineActivite;

  // bread crumb items
  breadCrumbItems!: Array<{}>;


  constructor(
    public toastService: ToastrService,
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private domaineActiviteService: DomaineActiviteService
  ) {}





  ngOnInit(): void {

    this.route.data.subscribe((data) =>{
      const {menu, sousmenu} = data
      this.menu = menu
      this.sousmenu = sousmenu
    })

    this.id = this.route.snapshot.params['id']

    this.domaineActiviteService.getSingleData(this.id).subscribe((data: DomaineActivite)=>{
      this.domaineActivite = data
      this.formRegister.controls['name'].setValue(this.domaineActivite.name)
    })






    /*   this.route.paramMap.subscribe((params) => {
         this.id = params.get('id');
         console.log(id)
        });

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

  }






  createForm(){

    this.formRegister = this.fb.group({
      name: ["",[Validators.required, Validators.minLength(3)]],
      code_apip: ["",[]],
      code_afristat: ["",[]],

    });
  }

  get ff() { return this.formRegister.controls; }

  register(){
    if(this.formRegister.valid){


      const  data = {
        id: this.id,
        name: this.formRegister.get('name')!.value
      }


      this.domaineActiviteService.patchData(data).subscribe({
        next: (res)=> {
          this.formRegister.reset()
          this.submitted= true;
          this.toastService.success('Modification d\' un domaine d\'activité a été effectué avec success', 'Succèss',{
            timeOut: 3000,
          })
          this.router.navigate(['../societe/domaines-activites'])

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
    this.router.navigate(['../societe/domaines-activites'])

  }




}
