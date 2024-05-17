import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GlobalComponent } from 'src/app/global-component';
import {Buyer} from "../models/buyer.model";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CommercialesService {

  constructor(private http: HttpClient) { }

   // Get
  getData(): Observable<Buyer[]> {

     return this.http.get<Buyer[]>(GlobalComponent.API_URL + GlobalComponent.commeriale, {responseType: 'json'});
  }

  // POST
  postData(data: any): Observable<any> {
    return this.http.post(GlobalComponent.API_URL + GlobalComponent.commeriale,JSON.stringify(data), httpOptions);
  }

  // Single
  getSingleData(id:any): Observable<Buyer> {

    return this.http.get<Buyer>(GlobalComponent.API_URL + GlobalComponent.commeriale + id, {   responseType: 'json' });
  }

  // Patch
  patchData(data: Buyer): Observable<any> {
    return this.http.patch(GlobalComponent.API_URL + GlobalComponent.commeriale + data.slug + "/", JSON.stringify(data), httpOptions);
  }

  // Delete
  delete(id:any): Observable<any> {

    return this.http.delete(GlobalComponent.API_URL + GlobalComponent.commeriale + id, {  responseType: 'text' });
  }


}

