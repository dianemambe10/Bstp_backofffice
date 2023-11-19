import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from '../models/auth.models';
import { GlobalComponent } from 'src/app/global-component';

const AUTH_API = GlobalComponent.AUTH_API;

@Injectable({ providedIn: 'root' })
export class AuthentificationService {

    private currentUserSubject: BehaviorSubject<User>;
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
     * Performs the auth
     * @param email email of user
     * @param password password of user
     */
    login(email: string, password: string) {
        return this.http.post<any>(`/auth/token/`, { email, password }).pipe(map(res => {
            // login successful if there's a jwt token in the response
            console.log(res)
            if (res && res.access) {
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
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null!);
    }


     // User profile
  getUserProfile(): Observable<any> {

    return this.http.get( 'user/current_user/')

  }

 
}
