import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GlobalComponent } from 'src/app/global-component';
import { Role } from '../models/role.model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(private http: HttpClient) { }

   // Get
   getData(): Observable<Role[]> {

    return this.http.get<Role[]>(GlobalComponent.API_URL + GlobalComponent.role, {  responseType: 'json'  });
  }

  // POST
  postData(customers: Role): Observable<any> {
    return this.http.post(GlobalComponent.API_URL + GlobalComponent.role,JSON.stringify(customers), httpOptions);
  }

  // Single
  getSingleData(id:any): Observable<Role> {

    return this.http.get<Role>(GlobalComponent.API_URL + GlobalComponent.role + id, {   responseType: 'json' });
  }

  // Patch
  patchData(data: Role): Observable<any> {
    return this.http.patch(GlobalComponent.API_URL + GlobalComponent.role + data.id + "/", JSON.stringify(data), httpOptions);
  }

  // Delete
  delete(id:any): Observable<any> {

    return this.http.delete(GlobalComponent.API_URL + GlobalComponent.role + id, {  responseType: 'text' });
  }


}

