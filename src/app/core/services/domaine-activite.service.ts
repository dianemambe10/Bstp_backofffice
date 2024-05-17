import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GlobalComponent } from 'src/app/global-component';
import {DomaineActivite} from "../models/domaine-activite.model";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DomaineActiviteService {

  constructor(private http: HttpClient) { }

   // Get
   getData(): Observable<DomaineActivite[]> {

    return this.http.get<DomaineActivite[]>(GlobalComponent.API_URL + GlobalComponent.domaine_activite, {   responseType: 'json'  });
  }

  // POST
  postData(data: DomaineActivite): Observable<any> {
    return this.http.post(GlobalComponent.API_URL + GlobalComponent.domaine_activite,JSON.stringify(data), httpOptions);
  }

  // Single
  getSingleData(id:any): Observable<DomaineActivite> {

    return this.http.get<DomaineActivite>(GlobalComponent.API_URL + GlobalComponent.domaine_activite + id + "/", {  responseType: 'json' });
  }

  // Patch
  patchData(data: DomaineActivite): Observable<any> {
    return this.http.patch(GlobalComponent.API_URL + GlobalComponent.domaine_activite + data.id + "/", JSON.stringify(data), httpOptions);
  }

  // Delete
  delete(id:any): Observable<any> {

    return this.http.delete(GlobalComponent.API_URL + GlobalComponent.domaine_activite + id);
  }


}

