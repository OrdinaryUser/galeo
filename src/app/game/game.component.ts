import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { Map } from '../shared/Map';
import { MapService } from '../shared/services/map.service';

@Component({
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  public gameSize: number = 800;
  public mapChunkSize: number = 800;
  public endLevel: boolean = false;
  public inventoryItems: Array<string> = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]
  // Cartesian plane x/y coordinates
  public map: Map = {
    "mapName": "undefined",
    "mapDifficulty": "undefined",
    "mapChunks": []
  };
  errorMessage?: string = '';
  msub: Subscription = new Subscription();
  
  constructor(private mapService: MapService) { }

  public getMapHeight(): number {
    return Math.max.apply(Math, this.map.mapChunks.map(function(o) { return o.yPosition }))
  }
  public getMapWidth(): number {
    return Math.max.apply(Math, this.map.mapChunks.map(function(o) { return o.xPosition }))
  }

  ngOnInit() {
    this.msub = this.mapService.getMaps().subscribe({
      next: maps => {
        // Pick a random map
        this.map = maps[Math.floor(Math.random() * maps.length)];
        this.ArrangeMap();
        this.mapChunkSize = this.gameSize / this.getMapWidth();
      },
      error: err => this.errorMessage += err
    });
  }

  // Rearrange the map to work with cartesian coordinates
  public ArrangeMap(): void {
    this.map.mapChunks.sort((a, b) => (a.yPosition < b.yPosition) ? 1 : (a.yPosition === b.yPosition) ? ((a.xPosition > b.xPosition) ? 1 : -1) : -1);
  }

  // Movement functions
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
    // Remove the player from the "from" chunk
    this.map.mapChunks[from].objectName = ''

    // Add it to the "to" chunk
    this.map.mapChunks[to].objectName = 'Player';
  }

  public MoveUp() {
    var playerChunkIndex = this.map.mapChunks.findIndex(c => c.objectName === "Player");
    var playerChunk = this.map.mapChunks[playerChunkIndex];

    // Don't move if the player is at the top of the map
    if(playerChunk !== undefined && playerChunk.yPosition !== this.getMapHeight()) {
      var targetChunkIndex = this.map.mapChunks.findIndex(c => c.xPosition === playerChunk.xPosition && c.yPosition === playerChunk.yPosition + 1);
      var targetChunk = this.map.mapChunks[targetChunkIndex];
      if(targetChunk !== undefined && targetChunk.traversable) {
        if(targetChunk.objectName === "Exit") {
          this.EndLevel();
        }
        this.MovePlayer(playerChunkIndex, targetChunkIndex);
      }
    } 
  }

  public MoveLeft() {
    var playerChunkIndex = this.map.mapChunks.findIndex(c => c.objectName === "Player");
    var playerChunk = this.map.mapChunks[playerChunkIndex];

    // Don't move if the player is at the far left side of the map
    if(playerChunk !== undefined && playerChunk.xPosition !== 1) {
      var targetChunkIndex = this.map.mapChunks.findIndex(c => c.xPosition === playerChunk.xPosition - 1 && c.yPosition === playerChunk.yPosition);
      var targetChunk = this.map.mapChunks[targetChunkIndex];
      if(targetChunk !== undefined && targetChunk.traversable) {
        if(targetChunk.objectName === "Exit") {
          this.EndLevel();
        }
        this.MovePlayer(playerChunkIndex, targetChunkIndex);
      }
    }
  }

  public MoveDown() {
    var playerChunkIndex = this.map.mapChunks.findIndex(c => c.objectName === "Player");
    var playerChunk = this.map.mapChunks[playerChunkIndex];

    // Don't move if the player is at the bottom of the map
    if(playerChunk !== undefined && playerChunk.yPosition !== 1) {
      var targetChunkIndex = this.map.mapChunks.findIndex(c => c.xPosition === playerChunk.xPosition && c.yPosition === playerChunk.yPosition - 1);
      var targetChunk = this.map.mapChunks[targetChunkIndex];
      if(targetChunk !== undefined && targetChunk.traversable) {
        if(targetChunk.objectName === "Exit") {
          this.EndLevel();
        }
        this.MovePlayer(playerChunkIndex, targetChunkIndex);
      }
    }
  }

  public MoveRight() {
    var playerChunkIndex = this.map.mapChunks.findIndex(c => c.objectName === "Player");
    var playerChunk = this.map.mapChunks[playerChunkIndex];

    // Don't move if the player is at the far left side of the map
    if(playerChunk !== undefined && playerChunk.xPosition !== this.getMapWidth()) {
      var targetChunkIndex = this.map.mapChunks.findIndex(c => c.xPosition === playerChunk.xPosition + 1 && c.yPosition === playerChunk.yPosition);
      var targetChunk = this.map.mapChunks[targetChunkIndex];
      if(targetChunk !== undefined && targetChunk.traversable) {
        if(targetChunk.objectName === "Exit") {
          this.EndLevel();
        }
        this.MovePlayer(playerChunkIndex, targetChunkIndex);
      }
    }
  }

  public EndLevel() {
    this.endLevel = true;
  }
}
