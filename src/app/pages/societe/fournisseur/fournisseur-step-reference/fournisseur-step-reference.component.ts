import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { FormBuilder, FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Demandeur } from 'src/app/core/models/demandeur.model';
import {User} from "../../../../core/models/auth.models";
import {DataService} from "../../../../core/services/data.service";
import { contactData } from './data';
import {BsModalRef, ModalDirective} from "ngx-bootstrap/modal";
import {Actionnaire} from "../../../../core/models/actionnaire.model";
import {ReferenceCommericiale} from "../../../../core/models/referenceCommericiale.model";

@Component({
  selector: 'app-fournisseur-step-reference',
  templateUrl: './fournisseur-step-reference.component.html',
  styleUrls: ['./fournisseur-step-reference.component.scss']
})
export class FournisseurStepReferenceComponent implements AfterViewInit, OnInit {


  @Input()
  demandeur!: User;

  @Output() refAdd = new EventEmitter<any>();
  @Output() refDel = new EventEmitter<any>();
  @Output() refEdit = new EventEmitter<any>();


  submitted = false;
  modalRef?: BsModalRef;
  contactlist: any;
  endItem: any = 12;

  referenceList = []  as ReferenceCommericiale[]

  constructor(private fb: UntypedFormBuilder,
              private dataService: DataService
  ) {}

  ngOnInit(): void {

    this.dataService.selectedDataUser$.subscribe((user: User)=>{
     /* this.formStep1.controls['last_name'].setValue(user?.last_name)
      this.formStep1.controls['first_name'].setValue(user?.first_name)
      this.formStep1.controls['date_of_birth'].setValue(user?.date_of_birth)
      this.formStep1.controls['gender'].setValue(user?.gender)
      this.formStep1.controls['phone_number'].setValue(user?.phone_number)
      this.formStep1.controls['email'].setValue(user?.email)
      this.formStep1.controls['role_dans_lentreprise'].setValue(user?.role_dans_lentreprise) */
    })

    this.dataService.selectedReferenceList$.subscribe((reference: ReferenceCommericiale[])=>{
     // console.log(actionnaire)
      this.referenceList = reference
      console.log(this.referenceList)
    })



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




  addReference(){

  this.refAdd.emit("click")

}

  delReference(e: any, i: any){
    e.preventDefault()
    this.refDel.emit(i)

  }

  editReference(e: any, i: any){
    e.preventDefault()
    this.refEdit.emit(i)

  }

  ngOnDestroy(){

  }

}
