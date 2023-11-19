import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Demandeur } from 'src/app/core/models/demandeur.model';
import { Entreprise } from 'src/app/core/models/entreprise.model';
import {ToastrService} from "ngx-toastr";
import {UntypedFormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {TypeSocieteService} from "../../../../core/services/type-societe.service";
import {User} from "../../../../core/models/auth.models";
import {Region} from "../../../../core/models/region.model";
import {Prefecture} from "../../../../core/models/prefecture.model";
import {Commune} from "../../../../core/models/commune.model";
import {DomaineActivite} from "../../../../core/models/domaine-activite.model";
import {TypeSociete} from "../../../../core/models/type-societe.model";
import {DataService} from "../../../../core/services/data.service";


@Component({
  selector: 'app-fournisseur-step-end',
  templateUrl: './fournisseur-step-end.component.html',
  styleUrls: ['./fournisseur-step-end.component.scss']
})
export class FournisseurStepEndComponent {

  @Input()
  demandeur!: User;

  @Input()
  entreprise!: Entreprise;


  @Output() formEnd = new EventEmitter<any>();



  regionList: Region[]=[];
  prefectureList: Prefecture[]=[];
  communeList: Commune[]=[];
  typeSocietes: TypeSociete[]=[];
  domaineList: number[]=[];
  domaineActivites: DomaineActivite[]=[];

  constructor(
    public toastService: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) {}
  ngOnInit(): void {

    this.dataService.selectedDataRegionList$.subscribe((reg: Region[]) =>{
      this.regionList = reg
    })

    this.dataService.selectedDataPrefectureList$.subscribe((pre: Prefecture[]) =>{
      this.prefectureList = pre
    })

    this.dataService.selectedDataCommuneList$.subscribe((com: Commune[]) =>{
      this.communeList = com
    })

    this.dataService.selectedDataDomainList$.subscribe((dom: DomaineActivite[]) =>{
      this.domaineActivites = dom
    })

    this.dataService.selectedDatatypeList$.subscribe((typ: TypeSociete[]) =>{
      this.typeSocietes = typ
    })

  }



  cancel(e: Event){
    e.preventDefault()
    this.router.navigate(['../societe/acheteurs'])

  }

  save(e: Event){
    e.preventDefault()
    this.formEnd.emit("Submit")
  }

  nameRegion = (id: any) => this.regionList.find((r : Region) => r.id == id)?.name!

  namePrefecture = (id: any) => this.prefectureList.find((p : Prefecture) => p.id == id)?.name!

  nameCommune = (id: any) => this.communeList.find((c : Commune) => c.id == id)?.name!

  nametypeSociete = (id: any) =>  this.typeSocietes.find((c : TypeSociete) => c.id == id)?.name!

  nameDomaineActivite = (id: any) =>  this.domaineActivites.find((c : DomaineActivite) => c.id == id)?.name!





}

