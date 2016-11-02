import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <div>
      <p>{{copyright}}</p>
    </div>
  `,
})

export class AppFooterComponent {
  copyright: string = 'copyright@Pristine Core all right reserved';
}
