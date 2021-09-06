import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Users } from '../models/users';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  private currentUserSubject: BehaviorSubject<Users>;
  public currentUser: Observable<Users>;

  constructor(
    private http: HttpClient,
    @Inject("API_URL") public API_URL: any
    ) {
      this.currentUserSubject = new BehaviorSubject<Users>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Users {
    // console.log(this.currentUserSubject.value)
      return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    let abc ={
      'username':username,
      'password':password
    }
      return this.http.post<Users>(`${this.API_URL}/api/v1/usermodule/login/`,abc)
          .pipe(map(user => {
              // login successful if there's a jwt token in the response
              if(user.is_success){
                console.log(user)
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser',JSON.stringify(user));
                this.currentUserSubject.next(user);
            
              }
                

              return user;
          }));
  }

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
  }
}
