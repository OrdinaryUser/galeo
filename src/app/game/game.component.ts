import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChunkComponent } from '../chunk/chunk.component';
import { MapBuilderService } from '../map/map-builder.service';
import { Chunk } from '../shared/chunk';

@Component({
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  public mapColumns: number = 2;
  public mapRows: number = 2;
  public mapChunkSize: number = 1200 / this.mapColumns;
  public map: Array<ChunkComponent> = [
    { 
      terrainUrl: 'assets/images/terrain/grass.png',
      terrainDescription: 'An empty field of wild grass blowing in the wind.',
      objectUrl: null,
      objectDescription: null,
      traversable: true,
      xPosition: 1,
      yPosition: 1
    },
    { 
      terrainUrl: 'assets/images/terrain/grass.png',
      terrainDescription: 'An empty field of wild grass blowing in the wind.',
      objectUrl: 'assets/images/object/door.png',
      objectDescription: 'This is the exit!',
      traversable: true,
      xPosition: 1,
      yPosition: 2
    },
    { 
      terrainUrl: 'assets/images/terrain/grass.png',
      terrainDescription: 'An empty field of wild grass blowing in the wind.',
      objectUrl: 'assets/images/object/knight.png',
      objectDescription: 'Our valiant hero!',
      traversable: true,
      xPosition: 2,
      yPosition: 1
    },
    { 
      terrainUrl: 'assets/images/terrain/grass.png',
      terrainDescription: 'An empty field of wild grass blowing in the wind.',
      objectUrl: null,
      objectDescription: null,
      traversable: true,
      xPosition: 2,
      yPosition: 2
    }
  ];
}
