import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GlobalComponent } from 'src/app/global-component';
import {TypeDemande} from "../models/type-demande.model";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DemandeService {

  constructor(private http: HttpClient) { }

   // Get
   getData(): Observable<TypeDemande[]> {

    return this.http.get<TypeDemande[]>(GlobalComponent.API_URL + GlobalComponent.request_type, {  responseType: 'json'  });
  }

  // POST
  postData(customers: TypeDemande): Observable<any> {
    return this.http.post(GlobalComponent.API_URL + GlobalComponent.request_type,JSON.stringify(customers), httpOptions);
  }

  // Single
  getSingleData(id:any): Observable<TypeDemande> {

    return this.http.get<TypeDemande>(GlobalComponent.API_URL + GlobalComponent.request_type + id, {   responseType: 'json' });
  }

  // Patch
  patchData(data: TypeDemande): Observable<any> {
    return this.http.patch(GlobalComponent.API_URL + GlobalComponent.request_type + data.id + "/", JSON.stringify(data), httpOptions);
  }

  // Delete
  delete(id:any): Observable<any> {

    return this.http.delete(GlobalComponent.API_URL + GlobalComponent.request_type + id, {  responseType: 'text' });
  }


}

