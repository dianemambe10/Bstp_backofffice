import { TypeSocieteService } from './../../../../core/services/type-societe.service';
import { Component } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {UserProfileService} from "../../../../core/services/user.service";
import {RolService} from "../../../../core/services/role.service";
import {Role} from "../../../../core/models/role.model";
import {Prefecture} from "../../../../core/models/prefecture.model";


@Component({
  selector: 'app-utilisateur-add',
  templateUrl: './utilisateur-add.component.html',
  styleUrls: ['./utilisateur-add.component.scss']
})
export class UtilisateurAddComponent {
  public formRegister!: UntypedFormGroup;
  submitted = false;
  currentFile?: File;
  menu = '';
  sousmenu = '';

  roleList: Role[] = []

  constructor(
    public toastService: ToastrService,
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userProfileService : UserProfileService,
    private roleService: RolService
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

      this.roleService.getData().subscribe((data: Role[]) =>{
        this.roleList = data
      })

     }

     groupes: Array<{ id: string, name: string }> = [
      { id: '1', name: "BSTP" },
      { id: '2', name: "PTF" },
    ];

     civilites: Array<{ id: string, name: string }> = [
      { id: 'F', name: "Femme" },
      { id: 'M', name: "Homme" },
      ];


  last_name = new FormControl('',[Validators.required,Validators.minLength(3) ,Validators.pattern('[a-zA-Z0-9]+')])

  first_name = new FormControl('',[Validators.required,Validators.minLength(3),Validators.pattern('[a-zA-Z0-9]+')])

  gender  = new FormControl('',[Validators.required ] )
  groupe_id  = new FormControl('',[Validators.required ] )
  role_id  = new FormControl('1',[Validators.required ] )

  phone_number = new FormControl('',[Validators.required ])

  email = new FormControl('',[
          Validators.required,Validators.email,] //, [this.emailTaken.validate]
        )
  is_active = new FormControl('')


  avatar_ppoi = new FormControl('', [Validators.nullValidator]);
  username = new FormControl('', [Validators.nullValidator]);
  role_dans_lentreprise = new FormControl('', [Validators.nullValidator]);





    createForm(){


      this.formRegister = this.fb.group({
        username: this.username,
        first_name: this.first_name,
        last_name: this.last_name,
        gender: this.gender,
        email: this.email,
        phone_number: this.phone_number,
        groupe_id: this.groupe_id,
        role_id: this.role_id,
        is_active: this.is_active,
        role_dans_lentreprise: this.role_dans_lentreprise

      });
    }

    get ff() { return this.formRegister.controls; }


    onImageSelected(file: File){


      this.formRegister.patchValue({logoFile: file})
      console.log(this.formRegister)

  }


    // File Upload
    imageURL: any;
    fileChange(event: any, id: any) {
      let fileList: any = (event.target as HTMLInputElement);
      let file: File = fileList.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file)
      reader.onload = () => {
        this.imageURL = reader.result as string;

        if (id == '1') {
          document.querySelectorAll('#user-img').forEach((element: any) => {
            element.src = this.imageURL;
          });
          this.formRegister.setControl('avatar_ppoi', this.fb.control(reader.result) )
        }
      }


    }



    register(){
      //this.formRegister.setControl('username', this.formRegister.get('email')?.value)
      this.formRegister.get('username')?.setValue(this.formRegister.get('email')?.value)
      console.log(this.formRegister.value)

      if(this.formRegister.valid){

        this.userProfileService.postData(this.formRegister.value).subscribe({
          next: (res)=> {
            this.formRegister.reset()
            this.submitted= true;
            this.toastService.success('Un nouvel utilisateur a été ajouté avec success', 'Succèss',{
              timeOut: 3000,
            })
            this.router.navigate(['../access/utilisateur'])

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
      this.router.navigate(['../access/utilisateur'])

    }




}


