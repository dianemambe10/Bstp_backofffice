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
export class DemandeService {

  constructor(private http: HttpClient) { }

   // Get
   getData(): Observable<any[]> {

    return this.http.get<any[]>(GlobalComponent.API_URL + GlobalComponent.request , {  responseType: 'json'  });
  }

  // POST
  postData(customers: any): Observable<any> {
    return this.http.post(GlobalComponent.API_URL + GlobalComponent.request,JSON.stringify(customers), httpOptions);
  }

  // Single
  getSingleData(slug:any): Observable<any> {

    return this.http.get<any>(GlobalComponent.API_URL + GlobalComponent.request + slug + "/", {   responseType: 'json' });
  }

  // Patch
  patchData(data: any): Observable<any> {
    return this.http.patch(GlobalComponent.API_URL + GlobalComponent.request + data.slug + "/", JSON.stringify(data), httpOptions);
  }

  // Delete
  delete(slug:any): Observable<any> {

    return this.http.delete(GlobalComponent.API_URL + GlobalComponent.request + slug, {  responseType: 'text' });
  }


  getRejected(slug:any): Observable<any> {

    return this.http.get<any>(GlobalComponent.API_URL +  "v1/request_reject/?request_slug=" +  slug , {   responseType: 'json' });
  }




}

