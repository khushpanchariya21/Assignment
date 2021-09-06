import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = this.authService.currentUserValue;
        console.log(this.authService.currentUserValue)
        if (currentUser && currentUser.data.token) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Token ${currentUser.data.token}`
                }
            });
        }

        return next.handle(request);
    }
}