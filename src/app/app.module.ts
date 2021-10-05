import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'game', component: GameComponent },
      { path: '**', redirectTo: 'game', pathMatch: 'full' }
    ])
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
