import { TypeSocieteService } from './../../../../core/services/type-societe.service';
import { Component } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.scss']
})
export class RoleEditComponent {

  public formRegister!: UntypedFormGroup;
  submitted = false;
  currentFile?: File;
  menu = '';
  sousmenu = '';

  constructor(
    public toastService: ToastrService,
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private typeSocieteService: TypeSocieteService
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

     }

     permission: Array<{ id: string, name: string }> = [
      { id: 'id', name: "can_view" },
      { id: 'id', name: "Can_edit" },
      { id: 'id', name: "Can_add" },
    ];


    name = new FormControl('',[Validators.required,Validators.minLength(3) ,Validators.pattern('[a-zA-Z0-9]+')])
    permission_id = new FormControl('',[Validators.required])








    createForm(){

      this.formRegister = this.fb.group({
        name: this.name,

      });
    }

    get ff() { return this.formRegister.controls; }


    register(){
      if(this.formRegister.valid){



        this.typeSocieteService.postData(this.formRegister.value).subscribe({
          next: (res)=> {
            this.formRegister.reset()
            this.submitted= true;
            this.toastService.success('Nouveau type de societe a été ajouté avec success', 'Succèss',{
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
