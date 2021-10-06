import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { Chunk } from "../shared/chunk";
import { Terrain } from "../shared/terrain";

@Injectable({
    providedIn: 'root'
})

export class MapBuilderService {
    private terrainsUrl = 'api/terrains.json';
    private map! : Array<Array<Chunk>>;
    private rowBuilder! : Array<Chunk>;

    constructor(private http: HttpClient) { }

    /*
    getTerrains(): Observable<Terrain[]> {
        return this.http.get<Terrain[]>(this.terrainsUrl).pipe(
            tap(data => console.log('All: ', JSON.stringify(data))),
            catchError(this.handleError)
        );
    }
    

    getMap(width: number, height: number): Array<Array<Chunk>> {
        for (var rowNum = 0; rowNum < height; rowNum++) {
            for(var colNum = 0; colNum < width; colNum++) {
                var chunk: Chunk = {
                    terrain: { terrainId: 1 },
                    traversable: true,
                    mapObject: { assetUrl: null }
                }
                this.rowBuilder.push(chunk)
            }
            this.map.push(this.rowBuilder);
            this.rowBuilder = [];
        }
        return this.map;
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
    */
}