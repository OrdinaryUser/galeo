import { Component } from "@angular/core";

@Component({
  selector: 'galeo-root',
  template: `
  <div class='container'>
    <router-outlet></router-outlet>
  </div>
  `
})
export class AppComponent { }