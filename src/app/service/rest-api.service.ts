import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RestApiService {
  private apiURL = 'https://gate-services.msu.ac.th/api';

  constructor(private http: HttpClient) {}
  // Http Options 
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  // Error handling
  private handleError(error: any) {
    console.log('handleError');
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    //window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }

  getSpareByid(id: number): Observable<any> {
    return this.http
      .get<any>(this.apiURL + '/sparerfid/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  getStudentByOrderid(orderid: number): Observable<any> {
    return this.http
      .get<any>(this.apiURL + '/student/order/' + orderid, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  sparerfid(datas:any){
    return this.http
      .put<any>(this.apiURL + "/sparerfid",datas,this.httpOptions)
      .pipe(retry(1),catchError(this.handleError));
  }
}