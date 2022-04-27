import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { IProbleme } from './probleme';
import { ITypeProbleme } from './TypeProbleme';

@Injectable({
  providedIn: 'root'
})
export class TypeProblemeService {
  obtenirTypesProbleme() {
    throw new Error('Method not implemented.');
  }

  

  constructor(private http: HttpClient) {}


  saveProbleme(probleme: IProbleme): Observable<IProbleme> {
    return this.createProbleme(probleme);
  }

 /** POST: add a new problem to the server */
 private createProbleme(probleme: IProbleme): Observable<IProbleme> {
  return this.http.post<IProbleme>(this.baseUrl, probleme, this.httpOptions).pipe(
    tap((probleme: IProbleme) => console.log('added problem w/ id=${probleme.id}')),
    catchError(this.handleError)
  );
}


private httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


  
    
  //private baseUrl = 'https://localhost:7104/Intervention';
  private baseUrl = 'https://interventionssm2021.azurewebsites.net/Intervention';

  obtenirTypesprobleme(): Observable<ITypeProbleme[]> {

    return this.http.get<ITypeProbleme[]>(this.baseUrl).pipe(

        tap(data => console.log('obtenirTypesprobleme: ' + JSON.stringify(data))),

        catchError(this.handleError)

        );

  }  

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }  
}
