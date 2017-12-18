import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Http, HttpModule, RequestOptions, XHRBackend } from '@angular/http';

import { AppComponent } from './app.component';
import {DataService} from './data.service';
import { AsyncAwareButton } from './async-aware-button';
import {Alert} from "./alert.component";

//Third party library imports
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'



@NgModule({
  declarations: [
    AppComponent,
    AsyncAwareButton,
    Alert
  ],
  imports: [
    BrowserModule, HttpModule, FormsModule, ReactiveFormsModule, NgbModule.forRoot()
  ],
  providers: [DataService],
  entryComponents: [Alert],
  bootstrap: [AppComponent]
})
export class AppModule { }
