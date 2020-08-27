import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  // note one controller can use html, another pug due to angular.webpack.js allowing a raw-loader for HTML
  templateUrl: './app.component.pug',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pug-support-example';
}
