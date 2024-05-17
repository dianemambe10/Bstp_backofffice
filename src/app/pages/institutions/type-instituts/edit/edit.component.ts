import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TypeInstitutService } from 'src/app/core/services/type-institut.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  public formRegister!: UntypedFormGroup;
  submitted = false;
  currentFile?: File;
  menu = '';
  sousmenu = '';
  id!: number;
  typeInstitut!: any;


  constructor(
    public toastService: ToastrService,
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private typeInstitutService: TypeInstitutService
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

      this.typeInstitutService.getSingleData(this.id).subscribe((data: any)=>{
        this.typeInstitut = data
        this.formRegister.controls['id'].setValue(this.typeInstitut.id)
        this.formRegister.controls['name'].setValue(this.typeInstitut.name)

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

        const  data = {
          id: this.id,
          name: this.formRegister.get('name')!.value
        }


        this.typeInstitutService.patchData(data).subscribe({
          next: (res)=> {
            this.formRegister.reset()
            this.submitted= true;
            this.toastService.success('Type d\'institut  a été modifié avec success', 'Succès',{
              timeOut: 3000,
            })
            this.router.navigate(['../institution/type-instituts'])

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
