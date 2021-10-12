import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChunkObject } from '../shared/ChunkObject';
import { ChunkTerrain } from '../shared/ChunkTerrain';
import { TerrainService } from '../shared/services/terrain.service';
import { ObjectService } from '../shared/services/object.service';

@Component({
  selector: 'galeo-chunk',
  templateUrl: './chunk.component.html',
  styleUrls: ['./chunk.component.css']
})
export class ChunkComponent implements OnChanges, OnDestroy {
  // These will be defined by the map in the game component
  @Input() terrainName: string = '';
  @Input() objectName: string = '';
  @Input() xPosition: number = 1;
  @Input() yPosition: number = 1;
  errorMessage?: string = '';
  tsub: Subscription = new Subscription();
  osub: Subscription = new Subscription();

  // These will be filled based on the names provided
  public terrain?: ChunkTerrain;
  public object?: ChunkObject;

  constructor(private terrainService: TerrainService, private objectService: ObjectService) { }

  ngOnChanges(): void {
    this.tsub = this.terrainService.getTerrains().subscribe({
      next: terrains => {
        this.terrain = terrains.find(t => t.name === this.terrainName);
      },
      error: err => this.errorMessage += err
    });

    this.osub = this.objectService.getObjects().subscribe({
      next: objects => {
        this.object = objects.find(o => o.name === this.objectName);
      },
      error: err => this.errorMessage += err
    });
  }

  ngOnDestroy(): void {
      this.tsub.unsubscribe();
      this.osub.unsubscribe();
  }
}
