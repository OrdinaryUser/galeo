import { Component, HostListener, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChunkComponent } from '../chunk/chunk.component';
import { MapChunk } from '../shared/MapChunk';

@Component({
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  public mapColumns: number = 2;
  public mapRows: number = 2;
  public mapChunkSize: number = 1200 / this.mapColumns;
  // Cartesian plane x/y coordinates
  public map: Array<MapChunk> = [
    { 
      terrainName: 'Grass',
      objectName: 'Player',
      xPosition: 1,
      yPosition: 1
    },
    { 
      terrainName: 'Grass',
      objectName: '',
      xPosition: 1,
      yPosition: 2
    },
    { 
      terrainName: 'Grass',
      objectName: '',
      xPosition: 2,
      yPosition: 1
    },
    { 
      terrainName: 'Grass',
      objectName: 'Exit',
      xPosition: 2,
      yPosition: 2
    }
  ];

  ngOnInit() {
    this.ArrangeMap(this.map);
  }

  public ArrangeMap(map: Array<MapChunk>): void {
    // Looks complicated but basically..
    // Put higher y coordinate first, then lower x coordinates
    map.sort((a, b) => (a.yPosition < b.yPosition) ? 1 : (a.yPosition === b.yPosition) ? ((a.xPosition > b.xPosition) ? 1 : -1) : -1);
  }

  public key?: string;
/*
  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    this.Move(event.key)
  }

  public Move(direction: string): void {
    switch(this.key) {
      case 'w':
        MoveUp();
        break;
      case 'a':
        MoveLeft();
        break;
      case 's':
        MoveDown();
        break;
      case 'd':
        MoveRight();
        break;
      default:
        break;
    }
  }
*/
  public MoveUp(): void {

  }
}
