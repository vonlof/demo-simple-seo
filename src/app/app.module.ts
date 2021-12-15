import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {SeoModule} from "./seo/seo.module";
import {environment} from "../environments/environment";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SeoModule.forRoot(environment.seo)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
