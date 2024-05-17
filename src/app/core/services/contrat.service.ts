import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GlobalComponent } from 'src/app/global-component';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ContratService {

  constructor(private http: HttpClient) { }

   // Get
   getData(): Observable<any[]> {

    return this.http.get<any[]>(GlobalComponent.API_URL + GlobalComponent.contrat, {  responseType: 'json'  });
  }

  // POST
  postData(customers: any): Observable<any> {
    return this.http.post(GlobalComponent.API_URL + GlobalComponent.contrat,JSON.stringify(customers), httpOptions);
  }

  // Single
  getSingleData(slug:any): Observable<any> {

    return this.http.get<any>(GlobalComponent.API_URL + GlobalComponent.contrat + slug + "/", {   responseType: 'json' });
  }

  // Patch
  patchData(data: any): Observable<any> {
    return this.http.patch(GlobalComponent.API_URL + GlobalComponent.contrat + data.id + "/", JSON.stringify(data), httpOptions);
  }

  // Delete
  delete(slug:any): Observable<any> {

    return this.http.delete(GlobalComponent.API_URL + GlobalComponent.contrat + slug, {  responseType: 'text' });
  }


}

