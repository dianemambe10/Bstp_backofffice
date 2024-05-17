import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators } from 'ngx-editor';
import { ToastrService } from 'ngx-toastr';
import { Entreprise } from 'src/app/core/models/entreprise.model';
import { ModePayement } from 'src/app/core/models/mode-payement.model';
import { AbonnementService } from 'src/app/core/services/abonnement.service';
import { FournisseurService } from 'src/app/core/services/fournisseur.service';
import { ModePayementService } from 'src/app/core/services/mode-payement.service';

@Component({
  selector: 'app-abonnement-add',
  templateUrl: './abonnement-add.component.html',
  styleUrls: ['./abonnement-add.component.css']
})
export class AbonnementAddComponent implements OnInit {

  public formRegister!: UntypedFormGroup;
  submitted = false;
  currentFile?: File;
  menu = '';
  sousmenu = '';
  fournisseurs!: Entreprise[];
  modePaiement!: ModePayement[];
  modeDefault= 0;
  fournisseurDefault = 0;

  abonnementMensuel = 1000000;

  constructor(
    public toastService: ToastrService,
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private abonnementService: AbonnementService,
    private modePayementService: ModePayementService,
    private fournisseurService: FournisseurService,
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

      this.fournisseurService.getData().subscribe(data => this.fournisseurs = data)
      this.modePayementService.getData().subscribe(data => this.modePaiement = data)

     }







    createForm(){

     

      this.formRegister = this.fb.group({
        
        reference: ['',[Validators.required,Validators.minLength(3)]],
        numbreOfMounth: ['',[Validators.required]],
        amount: [{value: '0', disabled: true},[Validators.required]],
        gateway_transaction_code: ['00000000000000000'],
        remarks: [''],
        status: ['pending'],
        mode: ['',[Validators.required]],
        company: ['',[Validators.required]],
      });
    }

    get ff() { return this.formRegister.controls; }


    register(){
      if(this.formRegister.valid){

      this.formRegister.get('amount')?.enable()
       // this.formRegister.controls['amount'].setValue(this.abonnementMensuel *  this.formRegister.controls['numbreOfMounth'].value)
        this.abonnementService.postData(this.formRegister.value).subscribe({
          next: (res)=> {
            this.formRegister.reset()
            this.submitted= true;
            this.toastService.success('Nouveau paiment a été ajouté avec success', 'Succèss',{
              timeOut: 3000,
            })
            this.router.navigate(['../abonnement/paiement'])

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

    onMois(e: any){
      e.preventDefault()
      console.log(e.target.value)
      let montant = e.target.value * this.abonnementMensuel
      this.formRegister.controls['amount'].setValue(montant)
    }


}
