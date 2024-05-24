import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
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
      {id: 'virtuel', name: "Virtuel"}
    ];
    


  createForm(){

    this.formRegister = this.fb.group({
      title: ["",[Validators.required,Validators.minLength(3)]],
      centre: ["",[Validators.required]],
      thematiques: ["",[Validators.required]],
      description: ["",[Validators.required,Validators.minLength(3)]],
      status: ['',[Validators.required]],
      state: ['',[Validators.required]],
      support_pdf: ['',[Validators.required]],
      lien: ["",[],],
      date_publication: ['',[]],
      date_expiration: ['',[]],
      mode: ['',[Validators.required]]

    });
  }
    get f() { return this.formRegister.controls; }


    register(){
     // let data = { ...this.formRegister.value, ...{'support_pdf': this.uploadedFiles}}
    // let data = { ...this.formRegister.value, ...{'support_pdf': "ok"}}
     
      this.formRegister.get('support_pdf')?.setValue(this.uploadedFiles)
      console.log(this.formRegister.value)
      if(this.formRegister.valid){
      
        this.formationService.postData(this.formRegister.value).subscribe({
          next: (res)=> {
            this.formRegister.reset()
            this.submitted= true;
            this.toastService.success('Nouvelle formation a été ajouté avec success', 'Succèss',{
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

        console.log(this.formRegister.errors)

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
     // console.log(this.uploadedFiles)
     
     
       }
  
    // File Remove
    removeFile(event: any) {
      this.uploadedFiles.splice(this.uploadedFiles.indexOf(event), 1);
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
  

}
