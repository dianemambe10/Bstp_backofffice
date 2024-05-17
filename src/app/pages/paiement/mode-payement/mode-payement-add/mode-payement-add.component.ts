import { TypeSocieteService } from '../../../../core/services/type-societe.service';
import { Component } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {ModePayementService} from "../../../../core/services/mode-payement.service";



@Component({
  selector: 'app-mode-payement-add',
  templateUrl: './mode-payement-add.component.html',
  styleUrls: ['./mode-payement-add.component.scss']
})
export class ModePayementAddComponent {

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
    private modePayementService: ModePayementService
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

      this.createForm()

     }







    createForm(){

     

      this.formRegister = this.fb.group({
        
        name: ['',[Validators.required,Validators.minLength(3)]],
        description: [''],
        instructions: [''],
      });
    }

    get ff() { return this.formRegister.controls; }


    register(){
      if(this.formRegister.valid){



        this.modePayementService.postData(this.formRegister.value).subscribe({
          next: (res)=> {
            this.formRegister.reset()
            this.submitted= true;
            this.toastService.success('Nouveau mode de paiement a été ajouté avec success', 'Succèss',{
              timeOut: 3000,
            })
            this.router.navigate(['../paiement/mode-payement'])

          },
          error:(err)=>{
            this.toastService.error('Une erreur survenue', 'Erreur',{
              timeOut: 3000,
            })

          }
        })
      }else{

      }


    }

    cancel(e: Event){
      e.preventDefault()
      this.router.navigate(['../paiement/mode-payement'])

    }


}


