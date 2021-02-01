import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

const CREDENTIALS = 'credentials';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

    private username: string;
    private password: string;

    constructor(private authenticationService: AuthenticationService){}
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.username = this.authenticationService.getCredentials().username;
        this.password = this.authenticationService.getCredentials().password;

        if(localStorage.getItem(CREDENTIALS) != null) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Basic ${btoa(this.username + ':' + this.password)}`,
                    'Content-Type': 'application/json'
                }
            });
        }

        return next.handle(req);
    }
}