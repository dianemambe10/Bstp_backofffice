import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GlobalComponent } from 'src/app/global-component';
import {TypeDemande} from "../models/type-demande.model";
import {an} from "@fullcalendar/core/internal-common";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http: HttpClient) { }

   // Get
   getData(): Observable<any[]> {

    return this.http.get<any[]>(GlobalComponent.API_URL + GlobalComponent.documents, {  responseType: 'json'  });
  }

  // POST
  postData(customers: any): Observable<any> {
    return this.http.post(GlobalComponent.API_URL + GlobalComponent.documents,JSON.stringify(customers), httpOptions);
  }

  // Single
  getSingleData(id:any): Observable<any> {

    return this.http.get<any>(GlobalComponent.API_URL + GlobalComponent.documents + id + "/", {   responseType: 'json' });
  }

  // Patch
  patchData(data: any): Observable<any> {
    return this.http.patch(GlobalComponent.API_URL + GlobalComponent.documents + data.id + "/", JSON.stringify(data), httpOptions);
  }

  // Delete
  delete(id:any): Observable<any> {

    return this.http.delete(GlobalComponent.API_URL + GlobalComponent.documents + id, {  responseType: 'text' });
  }


}

