import {Inject, Injectable} from '@angular/core';
import {ISeoMetaData} from '../../interfaces/seo-meta.interface';
import {Meta, Title} from "@angular/platform-browser";
import {SEO_CONFIG} from "../../inject";
import {ISeoConfig} from "../../interfaces/seo-config.interface";

@Injectable({
  providedIn: 'root',
})
export class SeoService {

  constructor(
    @Inject(SEO_CONFIG) private config: ISeoConfig,
    private titleService: Title,
    private metaService: Meta) {
  }

  public update(data: ISeoMetaData): void {
    this.setTitle(data?.title)
    this.setDescription(data?.description)
    this.setKeywords(data?.keywords);
    this.setAuthor(data?.author);
    this.setType(data?.type);
    this.setImage(data?.image);
    this.setSiteName(this.config.siteName);
  }

  private setDescription(description?: string): void {
    if (description) {
      this.metaService.updateTag({name: 'description', content: description });
      this.metaService.updateTag({name: 'twitter:description', content: description });
      this.metaService.updateTag({property: 'og:description', content: description });
      this.metaService.updateTag({ itemprop: 'description', content: description }, `itemprop='description'`);
    } else {
      this.metaService.removeTag(`name='description'`);
      this.metaService.removeTag(`name='twitter:description'`);
      this.metaService.removeTag(`property='og:description'`);
      this.metaService.removeTag(`itemprop='description'`);
    }
  }

  private setType(type?: 'article' | 'website'): void {
    if (type) {
      this.metaService.updateTag({property: 'og:type', content: type});
    } else {
      this.metaService.removeTag(`property='og:type'`);
    }
  }

  private setKeywords(keywords?: string | string[]) {
    const keysAsString = keywords instanceof Array ? keywords?.join(',') : keywords;
    if (keysAsString && keysAsString?.length) {
      this.metaService.updateTag({name: 'keywords', content: keysAsString});
    } else {
      this.metaService.removeTag(`name='keywords'`);
    }
  }

  private setAuthor(author?: string) {
    if (author) {
      this.metaService.updateTag({name: 'author', content: author});
      this.metaService.updateTag({name: 'article:author', content: author});
    } else {
      this.metaService.removeTag(`name='author'`);
      this.metaService.removeTag(`name='article:author'`);
    }
  }

  private setSiteName(siteName?: string) {
    if (siteName) {
      this.metaService.updateTag({name: 'og:site_name', content: siteName});
    } else {
      this.metaService.removeTag(`name='og:site_name'`);
    }
  }

  private setImage(image?: string) {
  // TODO
  }

  private setTitle(title?: string): void {
    if (title) {
      this.titleService.setTitle(title);
      this.metaService.updateTag({name: 'title', content: title});
      this.metaService.updateTag({name: 'twitter:title', content: title});
      this.metaService.updateTag({name: 'twitter:image:alt', content: title});
      this.metaService.updateTag({property: 'og:image:alt', content: title});
      this.metaService.updateTag({property: 'og:title', content: title});
      this.metaService.updateTag({itemprop: 'name', content: title}, `itemprop='name'`);
    } else {
      this.metaService.removeTag(`name='title'`);
      this.metaService.removeTag(`name='twitter:title'`);
      this.metaService.removeTag(`name='twitter:image:alt'`);
      this.metaService.removeTag(`property='og:image:alt'`);
      this.metaService.removeTag(`property='og:title'`);
      this.metaService.removeTag(`itemprop='name'`);
    }
  }
}
