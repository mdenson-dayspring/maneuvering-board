import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { LOG_LOGGER_PROVIDERS }         from 'angular2-logger/core';

import { AppComponent } from './app.component';
import { GraphicalBoardDirective } from './graphical-board.component';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    AppComponent,
    GraphicalBoardDirective
  ],
  bootstrap: [ AppComponent ],
  providers: [ LOG_LOGGER_PROVIDERS ]
})
export class AppModule { }
