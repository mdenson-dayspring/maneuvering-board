import { Component } from '@angular/core';

@Component({
  selector: 'entry-panel',
  template: require('./entry-panel.component.html'),
  styles: [require('./entry-panel.component.scss')]
})
export class EntryPanelComponent {

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
