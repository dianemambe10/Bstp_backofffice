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
        this.formRegister.controls['thematiques'].setValue(this.formation.thematiques)
        this.formRegister.controls['date_publication'].setValue(this.formation.date_publication)
        this.formRegister.controls['date_expiration'].setValue(this.formation.date_expiration)
        this.formRegister.controls['status'].setValue(this.formation.status)
        this.formRegister.controls['state'].setValue(this.formation.state)
        this.formRegister.controls['centre'].setValue(this.formation.centre?.id)
        this.formRegister.controls['mode'].setValue(this.formation.mode)
  
  
  
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
      {id: 'virtuel', name: "Virtuel"}
    ];

  createForm(){

    this.formRegister = this.fb.group({
      id: ["",[]],
      title: ["",[Validators.required,Validators.minLength(3)]],
      centre: ["",[Validators.required]],
      thematiques: ["",[Validators.required]],
      description: ["",[Validators.required,Validators.minLength(3)]],
      status: ['',[Validators.required]],
      state: ['',[Validators.required]],
      mode: ['',[Validators.required]],
      support_pdf: ['',[Validators.required]],
      date_publication: ['',[]],
      date_expiration: ['',[]],
      lien: ["",[],]

    });
  }
    get f() { return this.formRegister.controls; }


    register(){
     // let data = { ...this.formRegister.value, ...{'support_pdf': this.uploadedFiles}}
    // let data = { ...this.formRegister.value, ...{'support_pdf': "ok"}}
     
      this.formRegister.get('support_pdf')?.setValue(this.uploadedFiles)
      console.log(this.formRegister.value)
      if(this.formRegister.valid){
      
        this.formationService.patchData(this.formRegister.value).subscribe({
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
