import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { ChunkObject } from "../ChunkObject";
import { Map } from "../Map";

@Injectable({
    providedIn: 'root'
})

export class MapService {
    private mapUrl = 'api/maps.json';

    constructor(private http: HttpClient) { }
    
    getMaps(): Observable<Map[]> {
        return this.http.get<Map[]>(this.mapUrl).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(err: HttpErrorResponse) {
        let errorMessage = '';
        if(err.error instanceof ErrorEvent) {
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}