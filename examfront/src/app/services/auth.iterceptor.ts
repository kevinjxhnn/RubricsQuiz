
import { Injectable, NgModule } from '@angular/core';

import { HTTP_INTERCEPTORS, HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';



@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private login: LoginService){}

    intercept(
        req: HttpRequest<any>, 
        next: HttpHandler
        ): Observable<HttpEvent<any>> {
       
        //inject the jwt token stored in local storage to the reqs

        let authReq = req;
        const token=this.login.getToken();  
        


        if(token != null){

            //clones the req and then injects the following into the header
            authReq=authReq.clone({
                setHeaders: {Authorization : `Bearer ${token}`}
            })
        }

        return next.handle(authReq);
    }
}

export const authInterceptorProviders = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
    },
];



