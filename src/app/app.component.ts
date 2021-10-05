import { Component } from "@angular/core";

@Component({
  selector: 'galeo-root',
  template: `
  <h1>Welcome to {{pageTitle}}!</h1>
  <div class='container'>
    <router-outlet></router-outlet>
  </div>
  `
})
export class AppComponent {
  pageTitle: string = 'Galeo App';
}