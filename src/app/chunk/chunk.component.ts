import { Component } from '@angular/core';

@Component({
  selector: 'galeo-chunk',
  templateUrl: './chunk.component.html',
  styleUrls: ['./chunk.component.css']
})
export class ChunkComponent {
  public showBackground: boolean = true;
  public terrainUrl: string = 'assets/images/terrain/grass.png';
  public terrainDescription: string = 'An empty field of wild grass blowing in the wind.';
  public traversable: boolean = true;
  public xPosition: number = 1;
  public yPosition: number = 1;

  constructor() { };
}
