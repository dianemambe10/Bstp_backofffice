import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// Auth Services
import { AuthentificationService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

import {JwtHelperService} from '@auth0/angular-jwt';




@Injectable({ providedIn: 'root' })
export class AuthGuard  {
    constructor(
        private router: Router,
        private authenticationService: AuthentificationService,
        public toastService: ToastrService,
        private jwtHelper: JwtHelperService
    ) { }

    isTokenExpired(token: string) {
      const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
      
      return (Math.floor((new Date).getTime() / 1000)) >= expiry;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

            const currentUser = this.authenticationService.currentUserValue;
            const token = this.jwtHelper.tokenGetter()
            // check if user data is in storage is logged in via API.
            if ((!this.authenticationService.isToken()) || (this.jwtHelper.isTokenExpired()) ) {
              // not logged in so redirect to login page with the return url
              this.toastService.error('Une erreur survenue', 'Erreur',{
                  timeOut: 3000,
                })
                console.log("une erreur")
                 // logged in so return true
                 this.authenticationService.logout()
                // this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
                 this.router.navigate(['/auth/login']);
                
                 return false;
            }

           

        
        
        return true;
    }
}
