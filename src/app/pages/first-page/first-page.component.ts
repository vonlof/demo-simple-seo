import {Component} from '@angular/core';
import {SeoService} from "../../seo/services/seo/seo.service";

@Component({
  selector: 'first-page',
  templateUrl: './first-page.component.html',
  styles: [`
    :host {
      display: block
    }

    ;`]
})
export class FirstPageComponent {
  title = 'Demo first page simple seo';

  constructor(private seoService: SeoService) {
    this.seoService.update({
      title: this.title,
      description: 'This is the first page for how to build a simple SEO wrapper for an angular frontend application',
      keywords: ['Seo', 'Simple', 'First'],
      author: 'Chewie',
      type: 'article'
    })
  }
}
