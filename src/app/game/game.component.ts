import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
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
  public map: Array<Chunk> = [
    { 
      showBackground: true,
      terrainUrl: 'assets/images/terrain/grass.png',
      terrainDescription: 'An empty field of wild grass blowing in the wind.',
      traversable: true,
      xPosition: 1,
      yPosition: 1
    },
    { 
      showBackground: true,
      terrainUrl: 'assets/images/terrain/grass.png',
      terrainDescription: 'An empty field of wild grass blowing in the wind.',
      traversable: true,
      xPosition: 1,
      yPosition: 2
    },
    { 
      showBackground: true,
      terrainUrl: 'assets/images/terrain/grass.png',
      terrainDescription: 'An empty field of wild grass blowing in the wind.',
      traversable: true,
      xPosition: 2,
      yPosition: 1
    },
    { 
      showBackground: true,
      terrainUrl: 'assets/images/terrain/grass.png',
      terrainDescription: 'An empty field of wild grass blowing in the wind.',
      traversable: true,
      xPosition: 2,
      yPosition: 2
    }
  ];
}
