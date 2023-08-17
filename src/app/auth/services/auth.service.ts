import {
  HttpClient,
  HttpHandler,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiPath } from 'src/app/core/config/api-path';
import { HttpService } from 'src/app/core/service/http/http.service';
import { LoginModelRequest } from '../models/login-model';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/sign-up';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends HttpService {

  constructor(protected override http: HttpClient,
    private router: Router,
    private cookieService: CookieService
    ) {
    super(http);
  }

  public onSignUp(user: User): Observable<any> {
    return this.http.post(ApiPath.REGISTER, user);
  }

  public onLogin(data: LoginModelRequest): Observable<any> {
    return this.http.post<any>(ApiPath.LOGIN, data);
  }

  public doLogout(): void {
    let tokenRemoving = this.cookieService.delete('access_token');
    localStorage.removeItem('email');
    if (tokenRemoving == null) {
      this.router.navigate(['login']);
    }
  }

  public setAccessTokenCookie(token: string, expirationTime: number) {
    let expires = new Date();
  }

  public checkCode(data: {code: string, mail: string}): Observable<any> {
    return this.http.post(ApiPath.CHECK_CODE, data);
  }

}
