import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GlobalComponent } from 'src/app/global-component';
import { TypeSociete } from '../models/type-societe.model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AbonnementService {

  constructor(private http: HttpClient) { }

   // Get
   getData(): Observable<TypeSociete[]> {

    return this.http.get<TypeSociete[]>(GlobalComponent.API_URL + GlobalComponent.abonnement, {  responseType: 'json'  });
  }

  // POST
  postData(customers: TypeSociete): Observable<any> {
    return this.http.post(GlobalComponent.API_URL + GlobalComponent.abonnement,JSON.stringify(customers), httpOptions);
  }

  // Single
  getSingleData(id:any): Observable<TypeSociete> {

    return this.http.get<TypeSociete>(GlobalComponent.API_URL + GlobalComponent.abonnement + id + "/", {   responseType: 'json' });
  }

  // Patch
  patchData(data: TypeSociete): Observable<any> {
    return this.http.patch(GlobalComponent.API_URL + GlobalComponent.abonnement + data.id + "/", JSON.stringify(data), httpOptions);
  }

  // Delete
  delete(id:any): Observable<any> {

    return this.http.delete(GlobalComponent.API_URL + GlobalComponent.abonnement + id, {  responseType: 'text' });
  }


}

