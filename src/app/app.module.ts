import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LOG_LOGGER_PROVIDERS } from 'angular2-logger/core';

import { AppComponent } from './app.component';
import { EntryPanelComponent } from './entry-panel/entry-panel.component';
import { GraphicalBoardDirective } from './graphical-board.component';
import { ContactListService } from './services/contact-list.service';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    AppComponent,
    GraphicalBoardDirective,
    EntryPanelComponent
  ],
  bootstrap: [AppComponent],
  providers: [
    LOG_LOGGER_PROVIDERS,
    ContactListService
  ]
})
export class AppModule { }
