import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {Documents} from "../../../../core/models/document.model";
import {Entreprise} from "../../../../core/models/entreprise.model";

@Component({
  selector: 'app-fournisseur-step-three',
  templateUrl: './fournisseur-step-three.component.html',
  styleUrls: ['./fournisseur-step-three.component.scss']
})
export class FournisseurStepThreeComponent {

  @Output() formThree = new EventEmitter<Entreprise>();
  public formStep3!: UntypedFormGroup;
  public form!: UntypedFormGroup;

  public formFile!: UntypedFormGroup;
  submitted = false;
  file: File | null = null
  file_rccm: File | null = null
  file_nif: File | null = null
  file_dni: File | null = null
  file_cnss: File | null = null
  file_status: File | null = null
  file_aguipe: File | null = null

  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.createForm()
  }

  get f() { return this.formStep3.controls; }


  doc_rccm = new FormControl('', [Validators.nullValidator]);
  doc_nif = new FormControl('', [Validators.nullValidator]);
  doc_dni = new FormControl('', [Validators.nullValidator]);
  doc_cnss = new FormControl('', [Validators.nullValidator]);
  doc_status = new FormControl('', [Validators.nullValidator]);
  doc_aguipe = new FormControl('', [Validators.nullValidator]);

 // rccm_document = new FormControl(null, [Validators.nullValidator]);
 // nif_document = new FormControl(null, [Validators.nullValidator]);
 // quitus_fiscal_document = new FormControl(null, [Validators.nullValidator]);
 // quitus_social_document = new FormControl(null, [Validators.nullValidator]);
 // statut_document = new FormControl(null, [Validators.nullValidator]);
 // aguipe_document = new FormControl(null, [Validators.nullValidator]);

  createForm(){

    this.formStep3 = this.fb.group({
      doc_rccm: this.doc_rccm,
      doc_nif: this.doc_nif,
      doc_dni: this.doc_dni,
      doc_cnss: this.doc_cnss,
      doc_status: this.doc_status,
      doc_aguipe: this.doc_aguipe

    });

   /* this.form = this.fb.group({
      rccm_document: this.rccm_document,
      nif_document: this.nif_document,
      quitus_fiscal_document: this.quitus_fiscal_document,
      quitus_social_document: this.quitus_social_document,
      statut_document: this.statut_document,
      aguipe_document: this.aguipe_document

    });
    */

    this.form = this.fb.group({});






  }

  thridStep(){
    /*const formData = new FormData();
    if(this.file_rccm)
      formData.append("rccm", this.file_rccm)
    if(this.file_nif)
      formData.append("nif", this.file_nif)
    if(this.file_dni)
      formData.append("dni", this.file_dni)
    if(this.file_cnss)
      formData.append("cnss", this.file_cnss)
    if(this.file_status)
      formData.append("status", this.file_status)
    if(this.file_aguipe)
      formData.append("aguipe", this.file_aguipe)
      */



    this.formThree.emit(this.form.value)

  }

  onChange(event: any, type: any){

    if(event.target.files && event.target.files.length){

      const reader = new FileReader();
      const file: File = event.target.files[0]
      reader.readAsDataURL(file);
      reader.onload = () =>
      {
        if(this.form.contains(type)){
          this.form.setControl(type,this.fb.control(reader.result))
        }else{
          this.form.addControl(type,this.fb.control(reader.result) )
        }

      }
    }

    console.log(this.formStep3.value)


  }

}
