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
        return this.http.get<User[]>(`api/users`);
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

  // POST
  postData(user: User): Observable<any> {
    return this.http.post(GlobalComponent.API_URL + GlobalComponent.user,JSON.stringify(user), httpOptions);
  }


  // Single
  getSingleData(id:any): Observable<User> {

    return this.http.get<User>(GlobalComponent.API_URL + GlobalComponent.user + id, {   responseType: 'json' });
  }

  // Patch
  patchData(data: User): Observable<any> {
    return this.http.patch(GlobalComponent.API_URL + GlobalComponent.user + data.id + "/", JSON.stringify(data), httpOptions);
  }

  // Delete
  delete(id:any): Observable<any> {

    return this.http.delete(GlobalComponent.API_URL + GlobalComponent.user + id, {  responseType: 'text' });
  }

  changePassword(data: any): Observable<any> {
    return this.http.put(GlobalComponent.API_URL + GlobalComponent.user + data.id + "/change_password/", JSON.stringify(data), httpOptions);
  }

}
