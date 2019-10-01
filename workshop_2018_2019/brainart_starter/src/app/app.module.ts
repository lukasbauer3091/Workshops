import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NightskyComponent } from './nightsky/nightsky.component';

import { PapaParseModule } from 'ngx-papaparse';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NightskyComponent
  ],
  imports: [
    BrowserModule,
    PapaParseModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
