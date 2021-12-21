import {Component} from '@angular/core';
import {SeoService} from "../../seo/services/seo/seo.service";

@Component({
  selector: 'first-page',
  templateUrl: './second-page.component.html',
  styles: [`
    :host {
      display: block
    }

    ;`]
})
export class SecondPageComponent {
  title = 'Demo second page simple seo';

  constructor(private seoService: SeoService) {
    this.seoService.update({
      title: this.title,
      description: 'This is the second page for how to build a simple SEO wrapper for an angular frontend application',
      keywords: ['Seo', 'Simple', 'Second'],
      author: 'Ivo',
      type: 'article'
    })
  }
}
