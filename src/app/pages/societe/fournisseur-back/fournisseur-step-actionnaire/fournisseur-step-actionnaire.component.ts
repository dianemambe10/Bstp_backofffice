import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { FormBuilder, FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Demandeur } from 'src/app/core/models/demandeur.model';
import {User} from "../../../../core/models/auth.models";
import {DataService} from "../../../../core/services/data.service";
import { contactData } from './data';
import {BsModalRef, ModalDirective} from "ngx-bootstrap/modal";
import {Actionnaire} from "../../../../core/models/actionnaire.model";

@Component({
  selector: 'app-fournisseur-step-actionnaire',
  templateUrl: './fournisseur-step-actionnaire.component.html',
  styleUrls: ['./fournisseur-step-actionnaire.component.scss']
})
export class FournisseurStepActionnaireComponent implements AfterViewInit, OnInit {


  @Input()
  demandeur!: User;

  @Output() actAdd = new EventEmitter<any>();
  @Output() actDel = new EventEmitter<any>();
  @Output() actEdit = new EventEmitter<any>();


  submitted = false;
  modalRef?: BsModalRef;
  contactlist: any;
  endItem: any = 12;

  actionnaireList: Actionnaire[] = []

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

    this.dataService.selectedActionnaireList$.subscribe((actionnaire: Actionnaire[])=>{
     // console.log(actionnaire)
      this.actionnaireList = actionnaire
      console.log(this.actionnaireList)
    })
// Fetch Data
    this.contactlist = contactData;





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




  addActionnaire(){

  this.actAdd.emit("click")

}

  delActionnaire(e: any, i: any){
    e.preventDefault()
    this.actDel.emit(i)

  }

  editActionnaire(e: any, i: any){
    e.preventDefault()
    this.actEdit.emit(i)

  }

}
