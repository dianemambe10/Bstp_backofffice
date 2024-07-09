import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { an } from '@fullcalendar/core/internal-common';
import { ToastrService } from 'ngx-toastr';
import { FinancementServices } from 'src/app/core/services/financement.service';
import { ThematiqueService } from 'src/app/core/services/thematique.service';

// Ck Editer
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { Editor, TOOLBAR_FULL } from 'ngx-editor';
import { ListModel } from '../list/list.model';
import { InstitutService } from 'src/app/core/services/institut.service';
import { Institut } from 'src/app/core/models/institut.model';
import { Thematique } from 'src/app/core/models/thematique';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  public formRegister!: UntypedFormGroup;
  submitted = false;
  currentFile?: File;
  menu = '';
  sousmenu = '';
  thematiquesListe = [] as Thematique[];

  editor: any = Editor;
  public Editor = ClassicEditor;
  toolbar: any = TOOLBAR_FULL;

  files: File[] = [];
  files1: File[] = [];
  instituts = [] as Institut[];
  documentArray = [] as any[];

  documents: Array<any> = [];
  file!: File | null;
  doc!: FormArray;
  constructor(
    public toastService: ToastrService,
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private financementService: FinancementServices,
    private thematiqueService: ThematiqueService,
    private institutService: InstitutService,
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
      this.thematiqueService.getData().subscribe(data => this.thematiquesListe = data)

      this.institutService.getData().subscribe(data => this.instituts = data)

      this.doc = <FormArray>this.formRegister.get("files")  ;

     }

     status: Array<{ id: string, name: string }> = [
      {id: 'public', name: "Public"},
      {id: 'private', name: "Privé"}
    ];

    etat: Array<{ id: string, name: string }> = [
      {id: 'publish', name: "Publié"},
      {id: 'unpublish', name: "Non Publié"}
    ];
    mode: Array<{ id: string, name: string }> = [
      {id: 'presentiel', name: "Presentiel"},
      {id: 'online', name: "Virtuel"}
    ];
    


  createForm(){

    this.formRegister = this.fb.group({
      title: ["",[Validators.required,Validators.minLength(3)]],
      thematiques: ["",[Validators.required]],
      description: ["",[Validators.required,Validators.minLength(3)]],
      status: ['',[Validators.required]],
      state: ['',[Validators.required]],
      organisme: ["",[Validators.required]],
      mode: ['',[Validators.required]],
      link_url: ["",[],],
      files: this.fb.array([], []),
      search: ['', []],
      certification: ['', []],
      periode: ['', []],
      duree: ['', []]
      

    });
  }
    get f() { return this.formRegister.controls; }


    register(){
     // let data = { ...this.formRegister.value, ...{'support_pdf': this.uploadedFiles}}
    // let data = { ...this.formRegister.value, ...{'support_pdf': "ok"}}
     
     // this.formRegister.get('files')?.patchValue(this.uploadedFiles.values)
      //console.log(this.formRegister.value)
      this.formRegister.setControl('files',this.doc)
      if(this.formRegister.valid){
      
        this.financementService.postData(this.formRegister.value).subscribe({
          next: (res)=> {
            this.formRegister.reset()
            this.submitted= true;
            this.toastService.success('Nouvelle formation a été ajouté avec success', 'Succèss',{
              timeOut: 3000,
            })
            this.router.navigate(['../learning/financement'])

          },
          error:(err)=>{
            this.toastService.error('Une erreur survenue', 'Erreur',{
              timeOut: 3000,
            })

          }
        })
      }else{

        console.log(this.formRegister.value)

      }


    }

    cancel(e: Event){
      e.preventDefault()
      this.router.navigate(['../learning/financement'])

    }




    public dropzoneConfig: DropzoneConfigInterface = {
      clickable: true,
      addRemoveLinks: true,
      previewsContainer: false
    };
  
    uploadedFiles: any[] = [];
  
    // File Upload
    imageURL: any;
    onUploadSuccess(event: any) {
     console.log("ok")
      setTimeout(() => {
        this.uploadedFiles.push(event[0]);
      }, 100);
      console.log(this.uploadedFiles)

      for(let i=0; i < this.uploadedFiles.length; i++ ){
        this.documentArray.push(this.fb.group({
          name: this.fb.control(<File>this.uploadedFiles[i]['name']),
          document: this.fb.control(<File>this.uploadedFiles[i]['dataURL']),
        }))
      }

      console.log(this.documentArray.values)
     
     
       }
  
    // File Remove
    removeFile(index: any) {
      this.documents.splice(index, 1);
      this.doc.removeAt(index);
    }
  
    // File Upload
    uploadedFiles1: any[] = [];
  
    // File Upload
 /*   onUploadSuccess1(event: any) {
      setTimeout(() => {
        this.uploadedFiles1.push(event[0]);
      }, 100);
    }*/
  
    // File Remove
 /*   removeFile1(event: any) {
      this.uploadedFiles1.splice(this.uploadedFiles1.indexOf(event), 1);
    }

    */

/*
    onFileChange(filename: string, event: any) {
      
  
    //  documents.clear();
      this.documents = [];
  
      if (event.target.files && event.target.files.length) {
        for(let i = 0; i < event.target.files.length; i++) {
          this.file = event.target.files[i];
          const reader = new FileReader();
          
          console.log(this.file);
  
          this.documents.push({
            name: this.file?.name,
          })
  
          reader.readAsDataURL(this.file!);
  
          reader.onload = () => {
            this.doc.push(this.fb.group({
              name: this.fb.control(this.file?.name),
              document: this.fb.control(reader.result),
            }))
          };
        }

        console.log(this.doc)
       // this.formRegister.setControl('files',doc)
      }
    }
  
  */

    onFileChange(filename: string, event: any) {

      if(event.target.files && event.target.files.length){
        const reader = new FileReader();
        const file: File = event.target.files[0]
        this.documents.push({
          name: file?.name,
          size: file?.size
        })
        console.log(this.documents.values)
        reader.readAsDataURL(file);
        reader.onload = () =>
        {
           this.doc.push(this.fb.group({
            name: this.fb.control(file?.name),
            document: this.fb.control(reader.result),
          }))
        }
      }

      console.log(this.doc.value)
    }


}
