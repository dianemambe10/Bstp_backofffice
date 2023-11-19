import { TypeSocieteService } from './../../../../core/services/type-societe.service';
import { Component } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {UserProfileService} from "../../../../core/services/user.service";
import {RolService} from "../../../../core/services/role.service";
import {Role} from "../../../../core/models/role.model";
import {TypeSociete} from "../../../../core/models/type-societe.model";
import {User} from "../../../../core/models/auth.models";


@Component({
  selector: 'app-utilisateur-edit',
  templateUrl: './utilisateur-edit.component.html',
  styleUrls: ['./utilisateur-edit.component.scss']
})
export class UtilisateurEditComponent {

  public formRegister!: UntypedFormGroup;
  submitted = false;
  currentFile?: File;
  menu = '';
  sousmenu = '';
  id!: number;
  user!: User;

  roleList: Role[] = []

  defaultRole: number | undefined = 0

  constructor(
    public toastService: ToastrService,
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userProfileService: UserProfileService,
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

      this.roleService.getData().subscribe((data: Role[]) =>{
        this.roleList = data
      })

      this.id = this.route.snapshot.params['id']

      this.userProfileService.getSingleData(this.id).subscribe((data: User)=>{
        this.user = data
        this.formRegister.controls['id'].setValue(this.user.id)
        this.formRegister.controls['username'].setValue(this.user.username)
        this.formRegister.controls['first_name'].setValue(this.user.first_name)
        this.formRegister.controls['last_name'].setValue(this.user.last_name)
        this.formRegister.controls['email'].setValue(this.user.email)
        this.formRegister.controls['phone_number'].setValue(this.user.phone_number)
        this.formRegister.controls['is_active'].setValue(this.user.is_active)
        this.formRegister.controls['role_id'].setValue(this.user.role_id)
        this.formRegister.controls['gender'].setValue(this.user.gender)
        this.defaultRole = this.user.role_id
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


  regions: Array<{ id: number, name: string }> = [
      { id: 1, name: "Boke" },
      { id: 2, name: "Conakry" },
      { id: 3, name: "Kindia" },
      { id: 4, name: "Labe" },
    ];
  last_name = new FormControl('Moahemed',[Validators.required,Validators.minLength(3) ,Validators.pattern('[a-zA-Z0-9]+')])

  first_name = new FormControl('Diane',[Validators.required,Validators.minLength(3),Validators.pattern('[a-zA-Z0-9]+')])

  gender  = new FormControl('M',[Validators.required ] )
  groupe_id  = new FormControl('1',[Validators.required ] )
  role_id  = new FormControl('1',[Validators.required ] )

  phone_number = new FormControl('624879563',[Validators.required ])

  email = new FormControl('diane@dsoft.com',[
    Validators.required,Validators.email,] //, [this.emailTaken.validate]
  )
  is_active = new FormControl('')
  ids = new FormControl('')


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
      id: this.ids,
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
      reader.onload = () => {
        this.imageURL = reader.result as string;
        if (id == '0') {
          document.querySelectorAll('#cover-img').forEach((element: any) => {
            element.src = this.imageURL;
          });
        }
        if (id == '1') {
          document.querySelectorAll('#user-img').forEach((element: any) => {
            element.src = this.imageURL;
          });
        }
      }

      reader.readAsDataURL(file)
    }


  register(){
    //this.formRegister.setControl('username', this.formRegister.get('email')?.value)
    this.formRegister.get('username')?.setValue(this.formRegister.get('email')?.value)
    console.log(this.formRegister.value)

    if(this.formRegister.valid){

      this.userProfileService.patchData(this.formRegister.value).subscribe({
        next: (res)=> {
          this.formRegister.reset()
          this.submitted= true;
          this.toastService.success('Nouveau type de societe a été ajouté avec success', 'Succèss',{
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
