import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, NgForm, UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import { Demandeur } from 'src/app/core/models/demandeur.model';
import {User} from "../../../../core/models/auth.models";
import {DataService} from "../../../../core/services/data.service";
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import {formatDate} from "@angular/common";

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


  get ff() { return this.formStep1.controls; }


  createForm(){

    this.formStep1 = this.fb.group({
      last_name: ['Mohamed', [Validators.required]],
      first_name: ['Diane', [Validators.required]],
      date_of_birth: ['1990/02/02', [Validators.required]],
      gender: ['M', [Validators.required]],
      phone_number: ['628492536', []],
      email: ['dianemambe@gmail.com', [Validators.required, Validators.email]],
      role_dans_lentreprise: ['PDG', []],
      username: ['', []],
    });

}

firstStep(){

  this.formStep1.get('username')?.setValue(this.formStep1.get('email')?.value)
  let yr = formatDate(this.formStep1.get('date_of_birth')?.value,'yyyy-MM-dd',"en-US")
  this.formStep1.get('date_of_birth')?.patchValue(yr)

  console.log(this.formStep1.value)

  this.formOne.emit(this.formStep1.value)

}

}
