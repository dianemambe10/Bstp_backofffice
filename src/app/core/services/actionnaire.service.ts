import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GlobalComponent } from 'src/app/global-component';
import {Actionnaire} from "../models/actionnaire.model";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ActionnaireService {

  constructor(private http: HttpClient) { }

   // Get
  getData(): Observable<Actionnaire[]> {

     return this.http.get<Actionnaire[]>(GlobalComponent.API_URL + GlobalComponent.actionnaire, {responseType: 'json'});
  }

  // POST
  postData(data: any): Observable<any> {
    return this.http.post(GlobalComponent.API_URL + GlobalComponent.actionnaire,JSON.stringify(data), httpOptions);
  }

  // Single
  getSingleData(id:any): Observable<Actionnaire> {

    return this.http.get<Actionnaire>(GlobalComponent.API_URL + GlobalComponent.actionnaire + id + "/", {   responseType: 'json' });
  }

  // Patch
  patchData(data: Actionnaire): Observable<any> {
    return this.http.patch(GlobalComponent.API_URL + GlobalComponent.actionnaire + data.id + "/", JSON.stringify(data), httpOptions);
  }

  // Delete
  delete(id:any): Observable<any> {

    return this.http.delete(GlobalComponent.API_URL + GlobalComponent.actionnaire + id, {  responseType: 'text' });
  }


  postDataBySupplier(data: any): Observable<any> {
    return this.http.post(GlobalComponent.API_URL + GlobalComponent.actionnaire +"get_supplier_associes/",JSON.stringify(data), httpOptions);
  }

  
   // Get member by supplier
   getMember(tag: any): Observable<Actionnaire[]> {

    return this.http.get<Actionnaire[]>(GlobalComponent.API_URL + GlobalComponent.actionnaire +  "get_supplier_associes/" + tag + "/", {responseType: 'json'});
 
  }


}

