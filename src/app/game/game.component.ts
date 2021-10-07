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
  public getMapHeight(): number {
    return Math.max.apply(Math, this.map.map(function(o) { return o.yPosition }))
  }
  public getMapWidth(): number {
    return Math.max.apply(Math, this.map.map(function(o) { return o.xPosition }))
  }

  ngOnInit() {
    console.log(this.map);
    this.ArrangeMap();
    console.log(this.map);
  }

  public ArrangeMap(): void {
    // Looks complicated but basically..
    // Put higher y coordinate first, then lower x coordinates
    this.map.sort((a, b) => (a.yPosition < b.yPosition) ? 1 : (a.yPosition === b.yPosition) ? ((a.xPosition > b.xPosition) ? 1 : -1) : -1);
  }

  public key?: string;
  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.Move(event.key)
  }

  public Move(direction: string): void {
    switch(direction) {
      case 'w':
        this.MoveUp();
        break;
      case 'a':
        this.MoveLeft();
        break;
        
      case 's':
        this.MoveDown();
        break;
      case 'd':
        this.MoveRight();
        break;
      default:
        break;
    }
  }

  public MovePlayer(from: number, to: number) {
    this.map[from].objectName = '';
    this.map[to].objectName = 'Player';
  }

  public MoveUp() {
    var playerChunkIndex = this.map.findIndex(c => c.objectName === "Player");
    var playerChunk = this.map[playerChunkIndex];

    // Don't move if the player is at the top of the map
    if(playerChunk !== undefined && playerChunk.yPosition !== this.getMapHeight()) {
      var targetChunkIndex = this.map.findIndex(c => c.xPosition === playerChunk.xPosition && c.yPosition === playerChunk.yPosition + 1);
      if(targetChunkIndex !== undefined) {
        this.MovePlayer(playerChunkIndex, targetChunkIndex);
      }
    } 
  }

  public MoveLeft() {
    var playerChunkIndex = this.map.findIndex(c => c.objectName === "Player");
    var playerChunk = this.map[playerChunkIndex];

    // Don't move if the player is at the far left side of the map
    if(playerChunk !== undefined && playerChunk.xPosition !== 1) {
      var targetChunkIndex = this.map.findIndex(c => c.xPosition === playerChunk.xPosition - 1 && c.yPosition === playerChunk.yPosition);
      if(playerChunkIndex !== undefined) {
        this.MovePlayer(playerChunkIndex, targetChunkIndex);
      }
    }
  }

  public MoveDown() {
    var playerChunkIndex = this.map.findIndex(c => c.objectName === "Player");
    var playerChunk = this.map[playerChunkIndex];

    // Don't move if the player is at the bottom of the map
    if(playerChunk !== undefined && playerChunk.yPosition !== 1) {
      var targetChunkIndex = this.map.findIndex(c => c.xPosition === playerChunk.xPosition && c.yPosition === playerChunk.yPosition - 1);
      if(playerChunkIndex !== undefined) {
        this.MovePlayer(playerChunkIndex, targetChunkIndex);
      }
    }
  }

  public MoveRight() {
    var playerChunkIndex = this.map.findIndex(c => c.objectName === "Player");
    var playerChunk = this.map[playerChunkIndex];

    // Don't move if the player is at the far left side of the map
    if(playerChunk !== undefined && playerChunk.xPosition !== this.getMapWidth()) {
      var targetChunkIndex = this.map.findIndex(c => c.xPosition === playerChunk.xPosition + 1 && c.yPosition === playerChunk.yPosition);
      if(playerChunkIndex !== undefined) {
        this.MovePlayer(playerChunkIndex, targetChunkIndex);
      }
    }
  }
}
