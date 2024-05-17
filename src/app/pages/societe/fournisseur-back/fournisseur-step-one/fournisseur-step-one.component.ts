import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, NgForm, UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import { Demandeur } from 'src/app/core/models/demandeur.model';
import {User} from "../../../../core/models/auth.models";
import {DataService} from "../../../../core/services/data.service";
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-fournisseur-step-one',
  templateUrl: './fournisseur-step-one.component.html',
  styleUrls: ['./fournisseur-step-one.component.scss']
})
export class FournisseurStepOneComponent implements AfterViewInit, OnInit {

  @Input()
  demandeur!: User;

  @Output() formOne = new EventEmitter<User>();
  public formStep1!: UntypedFormGroup;
  submitted = false;

  @ViewChild('formRef', {static: true}) eForm!: NgForm;


  color: any;

  colorTheme: any = 'theme-blue';
  bsConfig?: Partial<BsDatepickerConfig>;


  constructor(private fb: UntypedFormBuilder,
              private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.createForm()

    this.dataService.selectedDataUser$.subscribe((user: User)=>{
      this.formStep1.controls['last_name'].setValue(user?.last_name)
      this.formStep1.controls['first_name'].setValue(user?.first_name)
      this.formStep1.controls['date_of_birth'].setValue(user?.date_of_birth)
      this.formStep1.controls['gender'].setValue(user?.gender)
      this.formStep1.controls['phone_number'].setValue(user?.phone_number)
      this.formStep1.controls['email'].setValue(user?.email)
      this.formStep1.controls['role_dans_lentreprise'].setValue(user?.role_dans_lentreprise)
    })
    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme, showWeekNumbers: false });




  }
  ngAfterViewInit(){
   /* console.log(this.demandeur)
    this.formStep1.controls['last_name'].setValue(this.demandeur?.last_name)
    this.dataService.selectedData$.subscribe((value)=>{
      console.log(value)
    })
    */

  }


  civilites: Array<{ id: string, name: string }> = [
    { id: 'F', name: "Femme" },
    { id: 'M', name: "Homme" },
  ];

  last_name = new FormControl('',[
        Validators.required,
        Validators.minLength(3)
      ])

  first_name = new FormControl('Mohamed',[
        Validators.required,
        Validators.minLength(3)
      ])


  date_of_birth = new FormControl('1997/01/22',[
    Validators.required,
  ])

  gender  = new FormControl('',[
        Validators.required,

      ] //, [this.emailTaken.validate]
      )

  phone_number = new FormControl('622456932',[
        Validators.required
      ])

  email = new FormControl('diane@gmail.com',[
        Validators.required,
        Validators.email,
        //Validators.pattern(/^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/gm)
      ] //, [this.emailTaken.validate]
      )

  role_dans_lentreprise = new FormControl('Manager',[

        Validators.minLength(3)
      ])

  username = new FormControl('', [Validators.nullValidator]);

  get ff() { return this.formStep1.controls; }


  createForm(){

    this.formStep1 = this.fb.group({
      first_name: this.first_name,
      last_name: this.last_name,
      gender: this.gender,
      date_of_birth: this.date_of_birth,
      email: this.email,
      phone_number: this.phone_number,
      role_dans_lentreprise: this.role_dans_lentreprise,
      username: this.username

    });

}

firstStep(){

  this.formStep1.get('username')?.setValue(this.formStep1.get('email')?.value)

  console.log(this.formStep1.value)

  this.formOne.emit(this.formStep1.value)

}

}
