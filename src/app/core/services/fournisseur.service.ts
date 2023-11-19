import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GlobalComponent } from 'src/app/global-component';
import {Entreprise} from "../models/entreprise.model";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {

  constructor(private http: HttpClient) { }

   // Get
  getData(): Observable<Entreprise[]> {

     return this.http.get<Entreprise[]>(GlobalComponent.API_URL + GlobalComponent.fournisseur, {responseType: 'json'});
  }

  // POST
  postData(data: any): Observable<any> {
    return this.http.post(GlobalComponent.API_URL + GlobalComponent.fournisseur,JSON.stringify(data), httpOptions);
  }

  // Single
  getSingleData(id:any): Observable<Entreprise> {

    return this.http.get<Entreprise>(GlobalComponent.API_URL + GlobalComponent.fournisseur + id, {   responseType: 'json' });
  }

  // Patch
  patchData(data: Entreprise): Observable<any> {
    return this.http.patch(GlobalComponent.API_URL + GlobalComponent.fournisseur + data.slug + "/", JSON.stringify(data), httpOptions);
  }

  // Delete
  delete(id:any): Observable<any> {

    return this.http.delete(GlobalComponent.API_URL + GlobalComponent.fournisseur + id, {  responseType: 'text' });
  }


}

