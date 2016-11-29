import { Component } from '@angular/core';
import '../sass/styles.scss';

@Component({
  selector: 'my-app',
  template: require('./app.component.html'),
  styles: [require('./app.component.scss')]
})
export class AppComponent {

  constructor() {
  }

  resetScores() {
    console.log('reset');
    return false;
  }
  addScores(text: String) {
    console.log(text);
    return false;
  }
}
