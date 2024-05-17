import { TypeSocieteService } from './../../../../core/services/type-societe.service';
import { Component } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TypeSociete } from 'src/app/core/models/type-societe.model';


@Component({
  selector: 'app-type-societe-edit',
  templateUrl: './type-societe-edit.component.html',
  styleUrls: ['./type-societe-edit.component.scss']
})
export class TypeSocieteEditComponent {

  public formRegister!: UntypedFormGroup;
  submitted = false;
  currentFile?: File;
  menu = '';
  sousmenu = '';
  id!: number;
  typeSociete!: TypeSociete;

    // bread crumb items
    breadCrumbItems!: Array<{}>;


  constructor(
    public toastService: ToastrService,
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private typeSocieteService: TypeSocieteService
    ) {}





    ngOnInit(): void {

      this.route.data.subscribe((data) =>{
        const {menu, sousmenu} = data
        this.menu = menu
        this.sousmenu = sousmenu
      })

      this.id = this.route.snapshot.params['id']

      this.typeSocieteService.getSingleData(this.id).subscribe((data: TypeSociete)=>{
        this.typeSociete = data
        this.formRegister.controls['name'].setValue(this.typeSociete.name)
        this.formRegister.controls['code'].setValue(this.typeSociete.code)
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
        name: ["",[Validators.required]],
        code: ["",[Validators.required]]

      });
    }

    get ff() { return this.formRegister.controls; }

    register(){
      if(this.formRegister.valid){


       const  data = {
          id: this.id,
          name: this.formRegister.get('name')!.value,
          code: this.formRegister.get('code')!.value
        }


        this.typeSocieteService.patchData(data).subscribe({
          next: (res)=> {
            this.formRegister.reset()
            this.submitted= true;
            this.toastService.success('Modification d\' un  utilisateur a été effectué avec success', 'Succèss',{
              timeOut: 3000,
            })
            this.router.navigate(['../societe/type-societes'])

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
      this.router.navigate(['../societe/type-societes'])

    }



}
