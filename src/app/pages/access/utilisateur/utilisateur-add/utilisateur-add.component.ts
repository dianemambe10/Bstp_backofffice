
import { Component } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {UserProfileService} from "../../../../core/services/user.service";
import {RolService} from "../../../../core/services/role.service";
import {Role} from "../../../../core/models/role.model";
import {Demandeur} from "../../../../core/models/demandeur.model";
import {Entreprise} from "../../../../core/models/entreprise.model";
import {FournisseurService} from "../../../../core/services/fournisseur.service";


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
  categorie = '';
  roleList: Role[] = []
  groupe_id= 1;

  demandeur =  [] as Demandeur[]
  fournisseurs = [] as Entreprise[]

  constructor(
    public toastService: ToastrService,
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userProfileService : UserProfileService,
    private fournisseurService : FournisseurService,
    private roleService: RolService
    ) {}


    // bread crumb items
    breadCrumbItems!: Array<{}>;

    ngOnInit(): void {

      this.createForm()

      this.route.paramMap.subscribe((params) => {

         this.categorie = params.get('categorie')!;
         

        switch (this.categorie){
          case "bstp": this.groupe_id = 1;
                break;
          case "fournisseur": this.groupe_id = 2
                break
          case "acheteur": this.groupe_id = 3
                break
          default: break
        }
        if(this.groupe_id == 2 || this.groupe_id == 3){
          this.formRegister.setValidators([Validators.required])
          this.formRegister.updateValueAndValidity()
        }
        this.formRegister.get('groupe_id')?.setValue(this.groupe_id)
       });

      this.route.data.subscribe((data) =>{
        const {menu, sousmenu, categorie} = data
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

      this.roleService.getData().subscribe((data: Role[]) =>{
        this.roleList = data
      })
      this.userProfileService.getData().subscribe((data: Demandeur[]) => this.demandeur = data)
      this.fournisseurService.getData().subscribe((data: Entreprise[]) => this.fournisseurs = data)

     }

     groupes: Array<{ id: string, name: string }> = [
      { id: '1', name: "BSTP" },
      { id: '2', name: "PTF" },
    ];

     civilites: Array<{ id: string, name: string }> = [
      { id: 'F', name: "Femme" },
      { id: 'M', name: "Homme" },
      ];
     createForm(){

      this.formRegister = this.fb.group({
        id: [''],
        last_name: ['Mohamed', [Validators.required]],
        first_name: ['Diane', [Validators.required]],
        date_of_birth: ['1990/02/02', [Validators.required]],
        gender: ['M', [Validators.required]],
        phone_number: ['628492536', []],
        email: ['dianemambe@gmail.com', [Validators.required, Validators.email]],
        role_dans_lentreprise: ['PDG', []],
        username: ['', []],
        nationality: ['', []],
        groupe_id: ['', []],
        role: ['', []],
        is_active: ['', []],
        supplier: ['', []]
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

  onSuppliersChange(e: any){
      console.log(e)

    let index = this.fournisseurs.findIndex((data: Entreprise) => data.id == e)
    console.log(this.fournisseurs[index])

  }




}


