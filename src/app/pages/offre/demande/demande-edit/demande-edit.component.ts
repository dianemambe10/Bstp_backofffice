

import { TypeSocieteService } from './../../../../core/services/type-societe.service';
import { Component } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-demande-add',
  templateUrl: './demande-edit.component.html',
  styleUrls: ['./demande-edit.component.scss']
})
export class DemandeEditComponent {

  public formRegister!: UntypedFormGroup;
  submitted = false;
  currentFile?: File;
  menu = '';
  sousmenu = '';

  constructor(
    public toastService: ToastrService,
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private typeSocieteService: TypeSocieteService
    ) {}


    // bread crumb items
    breadCrumbItems!: Array<{}>;

    ngOnInit(): void {

      this.route.data.subscribe((data) =>{
        const {menu, sousmenu} = data
        this.menu = menu
        this.sousmenu = sousmenu
      })

      this.route.paramMap.subscribe((params) => {
        const id = params.get('id');
        console.log(id)
       });

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

     }


     regions: Array<{ id: number, name: string }> = [
      { id: 1, name: "Boke" },
      { id: 2, name: "Conakry" },
      { id: 3, name: "Kindia" },
      { id: 4, name: "Labe" },
    ];

    titre_de_la_demande = new FormControl('',[
      Validators.required,
      Validators.minLength(3),
      Validators.pattern('[a-zA-Z0-9]+')
    ])

    type_demande = new FormControl('',[
      Validators.required,
    ])

    domaine = new FormControl('',[
      Validators.required,
    ])
    date_publication = new FormControl('',[
      Validators.required,
      //Validators.pattern(/^(0?[1-9]|1[0-2])[\/](0?[1-9]|[12]\d|3[01])[\/](19|20)\d{2}$/)
    ])

    date_limite = new FormControl('',[
      Validators.required,
      //Validators.pattern(/^(0?[1-9]|1[0-2])[\/](0?[1-9]|[12]\d|3[01])[\/](19|20)\d{2}$/)
    ])

    description_sommaire = new FormControl('',[
      Validators.required,
      Validators.pattern('[a-zA-Z0-9]+')
    ])


    detail_demande = new FormControl('',[
      Validators.required,
    ])

    instruction_soumission = new FormControl('',[

    ])

    document = new FormControl('',[
      RxwebValidators.extension({extensions:["pdf","doc","docx"]})
    ])

    buyer_id = new FormControl('',[
      Validators.required,
    ])

    createForm(){

      this.formRegister = this.fb.group({
        titre_de_la_demande: this.titre_de_la_demande,
        type_demande: this.type_demande,
        domaine: this.domaine,
        date_limite: this.date_limite,
        description_sommaire: this.description_sommaire,
        detail_demande: this.detail_demande,
        instruction_soumission: this.instruction_soumission,
        document: this.document,
        buyer_id: this.buyer_id,
        date_publication: this.date_publication,

      });
    }

    get f() { return this.formRegister.controls; }


    register(){
      if(this.formRegister.valid){



        this.typeSocieteService.postData(this.formRegister.value).subscribe({
          next: (res)=> {
            this.formRegister.reset()
            this.submitted= true;
            this.toastService.success('Nouveau type de societe a été ajouté avec success', 'Succèss',{
              timeOut: 3000,
            })
            this.router.navigate(['../offre/demande'])

          },
          error:(err)=>{
            this.toastService.error('Une erreur survenue', 'Erreur',{
              timeOut: 3000,
            })

          }
        })
      }else{

        this.toastService.error('Complete les champs obligatoires', 'Erreur',{
          timeOut: 3000,
        })

      }


    }

    cancel(e: Event){
      e.preventDefault()
      this.router.navigate(['../offre/demande'])

    }


}
