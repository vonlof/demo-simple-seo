import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {SeoModule} from "./seo/seo.module";
import {environment} from "../environments/environment";
import {RouterModule, Routes} from "@angular/router";
import {FirstPageComponent} from "./pages/first-page/first-page.component";
import {SecondPageComponent} from "./pages/second-page/second-page.component";

const routes: Routes = [
  {
    path: '',
    component: FirstPageComponent,
  },
  {
    path: 'second-page',
    component: SecondPageComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    FirstPageComponent,
    SecondPageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    SeoModule.forRoot(environment.seo)
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
