
import { TypeSocieteService } from './../../../../core/services/type-societe.service';
import { Component } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {User} from "../../../../core/models/auth.models";
import {TypeDemandeService} from "../../../../core/services/type-demande.service";
import {TypeDemande} from "../../../../core/models/type-demande.model";


@Component({
  selector: 'app-type-demande-edit',
  templateUrl: './type-demande-edit.component.html',
  styleUrls: ['./type-demande-edit.component.scss']
})
export class TypeDemandeEditComponent {

  public formRegister!: UntypedFormGroup;
  submitted = false;
  currentFile?: File;
  menu = '';
  sousmenu = '';
  id!: number;
  typeDemande!: TypeDemande;


  constructor(
    public toastService: ToastrService,
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private typeDemandeService: TypeDemandeService
    ) {}


    // bread crumb items
    breadCrumbItems!: Array<{}>;

    ngOnInit(): void {

      this.route.data.subscribe((data) =>{
        const {menu, sousmenu} = data
        this.menu = menu
        this.sousmenu = sousmenu
      })

      this.route.paramMap.subscribe((params) => {
        const id = params.get('id');
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

      this.id = this.route.snapshot.params['id']

      this.typeDemandeService.getSingleData(this.id).subscribe((data: TypeDemande)=>{
        this.typeDemande = data
        this.formRegister.controls['id'].setValue(this.typeDemande.id)
        this.formRegister.controls['name'].setValue(this.typeDemande.name)

      })

     }

     name = new FormControl('',[
      Validators.required,
      Validators.minLength(3)

       ])


    ids = new FormControl('',[
    Validators.required,
    Validators.minLength(3)

  ])








    createForm(){

      this.formRegister = this.fb.group({
        id: this.ids,
        name: this.name,

      });
    }

    get ff() { return this.formRegister.controls; }


    register(){
      if(this.formRegister.valid){



        this.typeDemandeService.patchData(this.formRegister.value).subscribe({
          next: (res)=> {
            this.formRegister.reset()
            this.submitted= true;
            this.toastService.success('Type de demande  a été modifié avec success', 'Succès',{
              timeOut: 3000,
            })
            this.router.navigate(['../offre/type-demande'])

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
      this.router.navigate(['../offre/type-demande'])

    }

}
