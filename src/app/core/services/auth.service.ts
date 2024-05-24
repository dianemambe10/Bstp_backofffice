import { Injectable } from '@angular/core';
import { getFirebaseBackend } from '../../authUtils';
import { User } from '../models/auth.models';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { GlobalComponent } from "../../global-component";

const AUTH_API = GlobalComponent.AUTH_API;
const API_URL = GlobalComponent.API_URL;

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


@Injectable({ providedIn: 'root' })

/**
 * Auth-service Component
 */
export class AuthentificationService {


    headerToken = {'Authorization': `JWT `+ localStorage.getItem('access_token')};


    public currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;



    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')!));
        this.currentUser = this.currentUserSubject.asObservable();
    }

       /**
     * current user
     */
    public get currentUserValue(): User {
      return this.currentUserSubject.value;
  }



    /**
     * Performs the register
     * @param email email
     * @param password password
     */
    register(email: string, first_name: string, password: string) {
        // return getFirebaseBackend()!.registerUser(email, password).then((response: any) => {
        //     const user = response;
        //     return user;
        // });

        // Register Api
        return this.http.post(AUTH_API + 'token/', {
            email,
            first_name,
            password,
          });
    }

    /**
     * Performs the auth
     * @param username email of user
     * @param password password of user
     */
    login(username: string, password: string) {
        // return getFirebaseBackend()!.loginUser(email, password).then((response: any) => {
        //     const user = response;
        //     return user;
        // });


    /*   const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*', // Allow requests from any origin
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE', // Allow these HTTP methods
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept' // Allow these headers
        });
    */
       
        return this.http.post(API_URL +  'auth/token/',
        {
          username,
          password
        })

    }

    /**
     *
     * get token
     */
   public getToken(){

    return localStorage.getItem('access_token')

   }
   /**
    *
    * set token
    */

   storeToken(tokenValue: string){
    localStorage.setItem('access_token', tokenValue)
   }


   isToken(): boolean{

    return !!localStorage.getItem('access_token')

   }

  // User profile
  getUserProfile(): Observable<any> {

    return this.http.get( API_URL + 'user/current_user/', { headers: this.headerToken }).pipe(map(res => {
      // login successful if there's a jwt token in the response
      console.log(res)
      if (res ) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('toast', 'true');
        localStorage.setItem('currentUser', JSON.stringify(res));
        this.currentUserSubject.next(res);
      }
      return res;
    }));

  }



    /**
     * Logout the user
     */
    logout() {
        // logout the user
        // return getFirebaseBackend()!.logout();
        localStorage.removeItem('currentUser');
        localStorage.removeItem('access_token');
        this.currentUserSubject.next(null!);
    }

    /**
     * Reset password
     * @param email email
     */
    resetPassword(email: string) {
        return getFirebaseBackend()!.forgetPassword(email).then((response: any) => {
            const message = response.data;
            return message;
        });
    }

     // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }

}

