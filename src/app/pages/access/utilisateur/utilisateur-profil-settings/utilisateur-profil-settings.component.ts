import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  ValidationErrors, ValidatorFn,
  Validators
} from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {UserProfileService} from "../../../../core/services/user.service";
import {RolService} from "../../../../core/services/role.service";
import {User} from "../../../../core/models/auth.models";
import {AuthentificationService} from "../../../../core/services/auth.service";
import {formatDate} from "@angular/common";
import Validation, {ConfirmedValidator} from "../../../../core/helpers/confirm-password.validator";
@Component({
  selector: 'app-utilisateur-profil-settings',
  templateUrl: './utilisateur-profil-settings.component.html',
  styleUrls: ['./utilisateur-profil-settings.component.scss']
})
export class UtilisateurProfilSettingsComponent {

  public formRegister!: UntypedFormGroup;
  public formPassword!: UntypedFormGroup;
  submitted = false;

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  fieldTextType!: boolean;
  fieldTextType1!: boolean;
  fieldTextType2!: boolean;
  bsConfig?: Partial<BsDatepickerConfig>;
  EducationForm!: UntypedFormGroup;
  currentTab = 'personalDetails';

  menu = '';
  sousmenu = '';

  currentUser!: User;
  id!: number;

  imageURL: string = './assets/images/users/user-dummy-img.jpg';


  constructor(
    public toastService: ToastrService,
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userProfileService: UserProfileService,
    private roleService: RolService,
    private authentificationService: AuthentificationService

  ) {}

  ngOnInit(): void {

    this.currentUser = new  User()

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

    this.createForm()

    this.authentificationService.getUserProfile().subscribe((user: any) =>{
      this.id = user.id
      this.currentUser = user
      if(user?.avatar)
        this.imageURL = user?.avatar
      this.formRegister.controls['last_name'].setValue(user?.last_name)
      this.formRegister.controls['first_name'].setValue(user?.first_name)
      this.formRegister.controls['date_of_birth'].setValue(user?.date_of_birth)
      this.formRegister.controls['gender'].setValue(user?.gender)
      this.formRegister.controls['phone_number'].setValue(user?.phone_number)
      this.formRegister.controls['email'].setValue(user?.email)
    })
  }

  /**
   * Default Select2
   */
  selectedAccount = 'This is a placeholder';
  Skills = [
    { name: 'Illustrator' },
    { name: 'Photoshop' },
    { name: 'CSS' },
    { name: 'HTML' },
    { name: 'Javascript' },
    { name: 'Python' },
    { name: 'PHP' },
  ];

  civilites: Array<{ id: string, name: string }> = [
    { id: 'F', name: "Femme" },
    { id: 'M', name: "Homme" },
  ];


  last_name = new FormControl('Moahemed',[Validators.required,Validators.minLength(3)])

  first_name = new FormControl('Diane',[Validators.required,Validators.minLength(3)])

  gender  = new FormControl('M',[Validators.required ] )

  phone_number = new FormControl('624879563',[Validators.required ])

  email = new FormControl('diane@dsoft.com',[
    Validators.required,Validators.email,] //, [this.emailTaken.validate]
  )

  date_of_birth = new FormControl('',[Validators.nullValidator])



  avatar_ppoi = new FormControl('', [Validators.nullValidator]);
  username = new FormControl('', [Validators.nullValidator]);

  avatar = new FormControl('',[Validators.nullValidator])



  old_password = new FormControl('',[Validators.required ])
  password = new FormControl('@Ndroid1230',[Validators.required])
  confirm_password = new FormControl('@Ndroid1230',[Validators.required ])


  createForm(){


    this.formRegister = this.fb.group({
      username: this.username,
      first_name: this.first_name,
      last_name: this.last_name,
      gender: this.gender,
      email: this.email,
      phone_number: this.phone_number,
      date_of_birth: this.date_of_birth,
      avatar: this.avatar

    });

    this.formPassword = this.fb.group({
        old_password: this.old_password,
        password:  this.password,
        confirm_password:  this.confirm_password },
      { validators:   [Validation.match('password', 'confirm_password')]})
  }


  get f() { return this.formPassword.controls; }

  get ff() { return this.formRegister.controls; }

  // Change Tab Content
  changeTab(tab: string) {
    this.currentTab = tab;
  }

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

        if(this.formRegister.contains('avatar')){
          this.formRegister.setControl('avatar', this.fb.control(reader.result) )
        }else{
          this.formRegister.addControl('avatar',this.fb.control(reader.result) )
        }
      }
    }


  }

  /**
   * Password Hide/Show
   */
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  toggleFieldTextType1() {
    this.fieldTextType1 = !this.fieldTextType1
  }
  toggleFieldTextType2() {
    this.fieldTextType2 = !this.fieldTextType2;
  }


  register(){
    this.formRegister.get('username')?.setValue(this.formRegister.get('email')?.value)
    let yr = formatDate(this.formRegister.get('date_of_birth')?.value,'yyyy-MM-dd',"en-US")

    this.formRegister.get('date_of_birth')?.patchValue(yr)

    if(this.formRegister.valid){

      let data = {...this.formRegister.value, ...{"id": this.id}}
      ///console.log(data)

      this.userProfileService.patchData(data).subscribe({
        next: (res)=> {
          this.formRegister.reset()
          this.submitted= true;
          this.toastService.success('Nouveau type de societe a été ajouté avec success', 'Succèss',{
            timeOut: 3000,
          })
        //  this.router.navigate(['../access/utilisateur'])

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


  }

  changePassword(){

    this.submitted = true

    if(this.formPassword.valid){
      let data = {
        "old_password": this.formPassword.get('old_password')?.value,
        "new_password1": this.formPassword.get('password')?.value,
        "new_password2": this.formPassword.get('confirm_password')?.value,
        "id": this.id
      }
      this.userProfileService.changePassword(data).subscribe({
        next: (res)=> {
          this.formPassword.reset
          Object.keys(this.formPassword.controls).forEach((key) =>{
            const control = this.formPassword.controls[key];
            control.setErrors(null)
          })
          //this.submitted= true;
          this.toastService.success('Votre mot de passe a été modifié avec succès', 'Succès',{
            timeOut: 3000,
          })
          //  this.router.navigate(['../access/utilisateur'])

        },
        error:(e )=>{
          console.error(e)
          this.toastService.error(e, 'Erreur',{
            timeOut: 3000,
          })

        }
      })
    }
    else{
      Object.keys(this.formPassword.controls).forEach(key =>{
        let controlErrors: ValidationErrors | null = this.formPassword!.get(key)!.errors
        console.log(controlErrors)
        if(controlErrors != null){
          Object.keys(controlErrors).forEach(keyError =>{
            console.log("key control:" + key + ' keyError' + ', err value: ', controlErrors?.[keyError])
          })

        }
      })
      this.toastService.error('Une erreur survenue', 'Erreur',{
        timeOut: 3000,
      })

    }

   // console.log(JSON.stringify(this.formPassword.value, null, 2));


  }




}




