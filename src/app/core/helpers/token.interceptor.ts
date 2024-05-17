import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthentificationService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    public toastService: ToastrService,
    private authenticationService: AuthentificationService,
    private jwtHelper: JwtHelperService
) { }

intercept(
    request: HttpRequest<any>,
    next: HttpHandler
): Observable<HttpEvent<any>> {

  
    const token = this.authenticationService.getToken()

    
   

        // add authorization header with jwt token if available
        const currentUser = this.jwtHelper.tokenGetter()
        if (currentUser) {
            request = request.clone({
                setHeaders: {
                    Authorization: `JWT ${token}`,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*', // Allow requests from any origin
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE', // Allow these HTTP methods
                    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept' // Allow these headers
                },
            });
        }
        else{
          request = request.clone({
    
            setHeaders:{
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*', // Allow requests from any origin
        
            }
           })
        }

    return next.handle(request);
}


}

export const tokenInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
];
