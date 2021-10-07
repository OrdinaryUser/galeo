import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { ChunkObject } from "../ChunkObject";

@Injectable({
    providedIn: 'root'
})

export class ObjectService {
    private objectUrl = 'api/chunkobjects.json';

    constructor(private http: HttpClient) { }

    getObjects(): Observable<ChunkObject[]> {
        return this.http.get<ChunkObject[]>(this.objectUrl).pipe(
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