import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
    private token;
    constructor() { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this.token = localStorage.getItem('token');
        if (this.token) {
            request = request.clone({
                params: request.params.append("user_token", this.token)
            });
        }

        return next.handle(request).pipe();
    }
}
