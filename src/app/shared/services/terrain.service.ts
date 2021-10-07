import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, filter, tap } from "rxjs/operators";
import { ChunkTerrain } from "../ChunkTerrain";

@Injectable({
    providedIn: 'root'
})

export class TerrainService {
    private terrainUrl = 'api/chunkterrains.json';

    constructor(private http: HttpClient) { }

    getTerrains(): Observable<ChunkTerrain[]> {
        return this.http.get<ChunkTerrain[]>(this.terrainUrl).pipe(
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