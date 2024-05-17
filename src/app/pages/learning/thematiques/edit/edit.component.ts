import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TypeSociete } from 'src/app/core/models/type-societe.model';
import { ThematiqueService } from 'src/app/core/services/thematique.service';

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
  thematique!: any;

    // bread crumb items
    breadCrumbItems!: Array<{}>;


  constructor(
    public toastService: ToastrService,
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private thematiqueService: ThematiqueService
    ) {}





    ngOnInit(): void {

      this.route.data.subscribe((data) =>{
        const {menu, sousmenu} = data
        this.menu = menu
        this.sousmenu = sousmenu
      })

      this.id = this.route.snapshot.params['id']

      this.thematiqueService.getSingleData(this.id).subscribe((data: TypeSociete)=>{
        this.thematique = data
        this.formRegister.controls['name'].setValue(this.thematique.name)
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
        name: ["",[Validators.required]]

      });
    }

    get ff() { return this.formRegister.controls; }

    register(){
      if(this.formRegister.valid){


       const  data = {
          id: this.id,
          name: this.formRegister.get('name')!.value
        }


        this.thematiqueService.patchData(data).subscribe({
          next: (res)=> {
            this.formRegister.reset()
            this.submitted= true;
            this.toastService.success('Modification d\' une  thematique a été effectué avec success', 'Succèss',{
              timeOut: 3000,
            })
            this.router.navigate(['../learning/thematique'])

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
      this.router.navigate(['../learning/thematique'])

    }



}
