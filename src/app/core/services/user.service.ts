import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { User } from '../models/auth.models';
import {Observable} from "rxjs";
import {GlobalComponent} from "../../global-component";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({ providedIn: 'root' })
export class UserProfileService {
    constructor(private http: HttpClient) { }
    /***
     * Get All User
     */
    getAll() {
        return this.http.get<User[]>(`/users`);
    }

    /***
     * Facked User Register
     */
    register(user: User) {
        return this.http.post(`/user/`, user);
    }




  // Get
  getData(): Observable<User[]> {

    return this.http.get<User[]>(GlobalComponent.API_URL + GlobalComponent.user, {  responseType: 'json'  });
  }

  // Get
  getDataSupplier(): Observable<User[]> {

    return this.http.get<User[]>(GlobalComponent.API_URL + GlobalComponent.user + 'supplier/', {  responseType: 'json'  });
  }

  // Get
  getDataBuyer(): Observable<User[]> {

    return this.http.get<User[]>(GlobalComponent.API_URL + GlobalComponent.user + 'buyer/', {  responseType: 'json'  });
  }

  // POST
  postData(user: User): Observable<any> {
    return this.http.post(GlobalComponent.API_URL + GlobalComponent.user,JSON.stringify(user), httpOptions);
  }


  // Single
  getSingleData(slug:any): Observable<User> {

    return this.http.get<User>( GlobalComponent.API_URL + GlobalComponent.user + slug + "/", {   responseType: 'json' });
  }

  // Patch
  patchData(data: User): Observable<any> {
    return this.http.patch(GlobalComponent.API_URL + GlobalComponent.user + data.slug + "/", JSON.stringify(data), httpOptions);
  }

  // Delete
  delete(slug:any): Observable<any> {

    return this.http.delete(GlobalComponent.API_URL + GlobalComponent.user + slug, {  responseType: 'text' });
  }

  changePassword(data: any): Observable<any> {
    return this.http.put(GlobalComponent.API_URL + GlobalComponent.user + data.slug + "/change_password/", JSON.stringify(data), httpOptions);
  }

  getUserCollegue(slug:any): Observable<any[]> {
 
    return this.http.get<any[]>( GlobalComponent.API_URL + GlobalComponent.user + slug + "/get_collegues/", {   responseType: 'json' });
  }


}
