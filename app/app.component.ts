import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <app-header></app-header>
    <nav>
      <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
      <a routerLink="/heroes" routerLinkActive="active">Heroes</a>
    </nav>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `,
  styleUrls: [ 'css/app.component.css' ]
})
export class AppComponent {}
