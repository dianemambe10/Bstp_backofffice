import { Component } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {DomaineActiviteService} from "../../../../core/services/domaine-activite.service";

@Component({
  selector: 'app-domaine-activite-add',
  templateUrl: './domaine-activite-add.component.html',
  styleUrls: ['./domaine-activite-add.component.scss']
})
export class DomaineActiviteAddComponent {

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
    private domaineActiviteService: DomaineActiviteService
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

  }

  createForm(){

    this.formRegister = this.fb.group({
      name: ["",[Validators.required, Validators.minLength(3)]],
      code_apip: ["",[]],
      code_africa: ["",[]],

    });
  }

  get ff() { return this.formRegister.controls; }


  register(){
    if(this.formRegister.valid){



      this.domaineActiviteService.postData(this.formRegister.value).subscribe({
        next: (res)=> {
          this.formRegister.reset()
          this.submitted= true;
          this.toastService.success('Nouveau domaine d\'activité a été ajouté avec success', 'Succèss',{
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
