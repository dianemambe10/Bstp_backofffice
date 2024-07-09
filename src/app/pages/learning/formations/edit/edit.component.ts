import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { an } from '@fullcalendar/core/internal-common';
import { ToastrService } from 'ngx-toastr';
import { FormationServices } from 'src/app/core/services/formation.service';
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
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

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
  id: any;
  formation: any;
  
  documents: Array<any> = [];
  file!: File | null;
  doc!: FormArray;
  documentArray = [] as any[];

  constructor(
    public toastService: ToastrService,
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private formationService: FormationServices,
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

      this.id = this.route.snapshot.params['id']



      this.formationService.getSingleData(this.id).subscribe((data: any)=>{
        this.formation = data
        console.log(this.formation)
        this.formRegister.controls['id'].setValue(this.formation.id)
        this.formRegister.controls['title'].setValue(this.formation.title)
        this.formRegister.controls['description'].setValue(this.formation.description)

        var thema = []
        for(let i = 0; i < this.formation.thematiques.length; i++) {
          thema.push(this.formation.thematiques[i].id)
        }

        this.formRegister.controls['thematiques'].setValue(thema)
        this.formRegister.controls['periode'].setValue(this.formation.periode)
        this.formRegister.controls['duree'].setValue(this.formation.duree)
        this.formRegister.controls['status'].setValue(this.formation.status)
        this.formRegister.controls['state'].setValue(this.formation.state)
        this.formRegister.controls['organisme'].setValue(this.formation.organisme?.id)
        this.formRegister.controls['mode'].setValue(this.formation.mode)
        this.formRegister.controls['link_url'].setValue(this.formation.link_url)
        this.formRegister.controls['certification'].setValue(this.formation.certification)
        this.formRegister.controls['slug'].setValue(this.formation.slug)
       

          for(let i = 0; i < this.formation.documents.length; i++) {
            this.documents.push({
              name:  this.formation.documents[i].name,
              size: ""
            })
          }

          console.log(this.documents.values)
  
      })
  
       

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
      id: ["", []],
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
      duree: ['', []],
      slug: ['', []]
      

    });
  }
    get f() { return this.formRegister.controls; }


    register(){
     // let data = { ...this.formRegister.value, ...{'support_pdf': this.uploadedFiles}}
    // let data = { ...this.formRegister.value, ...{'support_pdf': "ok"}}
     
     // this.formRegister.get('files')?.patchValue(this.uploadedFiles.values)
      //console.log(this.formRegister.value)
     // if(this.doc.length>0)
        this.formRegister.setControl('files',this.doc)
      if(this.formRegister.valid){
      
        this.formationService.patchData(this.formRegister.value).subscribe({
          next: (res)=> {
            this.formRegister.reset()
            this.submitted= true;
            this.toastService.success("La modification d/'une  formation a été effectuée avec success", 'Succèss',{
              timeOut: 3000,
            })
            this.router.navigate(['../learning/formation'])

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
      this.router.navigate(['../learning/formation'])

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
