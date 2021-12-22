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

    if (this.config.siteName) {
      this.setSiteName(this.config.siteName);
    }
  }

  public setMetaTag(attr: 'name' | 'property' | 'itemprop', attrValue: string, content?: string | undefined, selector?: string) {
    if (content) {
      this.metaService.updateTag({ [attr]: attrValue, content }, selector);
    } else {
      this.metaService.removeTag(`${attr}='${attrValue}'`);
    }
  }

  private setDescription(description?: string): void {
    this.setMetaTag('name', 'description', description);
    this.setMetaTag('name', 'twitter:description', description);
    this.setMetaTag('property', 'og:description', description);
    this.setMetaTag('itemprop', 'description', description, `itemprop='description'`);
  }

  private setType(type?: 'article' | 'website'): void {
    this.setMetaTag('property', 'og:type', type);
  }

  private setKeywords(keywords?: string | string[]) {
    const wordsAsString = keywords instanceof Array ? keywords?.join(',') : keywords;
    this.setMetaTag('name', 'keywords', wordsAsString);
  }

  private setAuthor(author?: string) {
    this.setMetaTag('name', 'author', author);
    this.setMetaTag('name', 'article:author', author);
  }

  private setSiteName(siteName?: string) {
    this.setMetaTag('name', 'og:site_name', siteName);
  }

  private setTitle(title?: string): void {
    if (title) {
      this.titleService.setTitle(title);
    }
    this.setMetaTag('name', 'title', title);
    this.setMetaTag('name', 'twitter:title', title);
    this.setMetaTag('name', 'twitter:image:alt', title);
    this.setMetaTag('property', 'og:title', title);
    this.setMetaTag('property', 'og:image:alt', title);
    this.setMetaTag('itemprop', 'name', title, `itemprop='name'`);
  }
}
