import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //private apiURL = 'https://gate-services.msu.ac.th/api';
  private endpoint = 'http://localhost:3456/api/v1/ldap';

  constructor(private http: HttpClient) { }
  get httpHeaders() {
    let token = localStorage.getItem('access-token') || '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'x-access-token': token,
    });
  }
  get httpHeaders_multipath() {
    let token = localStorage.getItem('access-token') || '';
    return new HttpHeaders({
        'Content-Type': 'multipart/form-data',
        'Cache-Control': 'no-cache',
        'x-access-token': token,
      });
  }
  get httpOptions() {
    return {
      headers: this.httpHeaders,
    };
  }  
  get httpOptions_multipath() {
    return {
      headers: this.httpHeaders_multipath,
    };
  }
  // Error handling 
  private handleError(error: any) {
    var errorMsg: string = 'Unknow error!';
    console.log(error);
    if (error.error instanceof ErrorEvent) {
      // Client side error
      console.log('client side error');
      errorMsg = `Client Error: ${error.error.message}`;
    } else {
      // Server side error
      console.log('server side error');
      if (error instanceof HttpErrorResponse) {
        if (error.error) {
          //console.log(error.error);
          errorMsg = error.error;
        } else {
          errorMsg = error.statusText; //error.status + ' : ' + error.statusText;
        }
      } else {
        errorMsg = error;
      }
    }
    console.log('errorMsg=', errorMsg);
    return throwError(() => {
      return errorMsg;
    });
  } //handleError

  
login(datas:any){
  return this.http
  .post(this.endpoint + '/login', datas)
  .pipe(catchError(this.handleError));
}
me(){
  return this.http
  .get(this.endpoint+"/me",this.httpOptions)
  .pipe(catchError(this.handleError));
}







} //