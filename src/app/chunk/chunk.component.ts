import { Component, Input } from '@angular/core';

@Component({
  selector: 'galeo-chunk',
  templateUrl: './chunk.component.html',
  styleUrls: ['./chunk.component.css']
})
export class ChunkComponent {
  @Input() terrainUrl: string = 'assets/images/terrain/hidden.png';
  @Input() terrainDescription: string = 'Nothing here that you can see.';
  @Input() objectUrl: string | null = null;
  @Input() objectDescription: string | null = null;
  public traversable: boolean = true;
  public xPosition: number = 1;
  public yPosition: number = 1;

  constructor() { };
}
