# Creating a simple Angular SEO service

### How to build a simple SEO service for an angular frontend application, without a library ;)

![title](angular-seo.png)

In this article we are going to create a simple SEO service. This service will inject default Meta and Open Graph tags into the head of our application. This will enable social sharing in a serverside or pre-rendered Angular application.

Important: In general you should only use this module when you're using Angular Universal or Scully. Generating Meta tags on the frontend is basically useless as not all Crawlers can render Javascript applications.

Before we dive into this we need to know what SEO is. SEO stands for search engine optimization. 
It is a process of taking steps to help a website or piece of content rank higher on Google.
The difference between SEO and paid advertising is that SEO involves “organic” ranking, which means you don’t have to pay.

To make it a bit simpler, search engine optimization means taking a piece of online content and optimizing it so search engines like Google show it towards the top of the page when someone searches for something.

## Okay, that is defined, let's get started.

First (If you don't have a project yet) we will generate a new Angular project, us the following command to add one:

```bash
ng new demo-simple-seo
```

We want to keep the project neat and tidy, we are going to use modules. When all the dependencies are installed, and you have your favorite editor open add a new module named seo.

```bash
ng g module seo
```
Your folder structure will look something like this:

```editor
demo-simple-seo
 - src
 	- app
 	  - seo 
 	    - seo.module.ts
 	  - app.component.ts
 	  - app.component.html
 	  ...
 - angular.json
 - node_modules/
 - package.json
...

```
Within this module we are going to create an injection for a module configuration. It allows us to configure the services/components on module level. This is useful for mono repo's or custom packages.

Start by creating a file named ```interfaces/seo-config.interface.ts```
Add the following interface:

```typescript
export interface ISeoConfig {
  siteName: string;
  siteUrl: string;
  image?: string;
}
```
Then we create a ```inject.ts``` file.

```typescript
import { InjectionToken } from '@angular/core';
import { ISeoConfig } from './interfaces/seo-config.interface';

export const SEO_CONFIG = new InjectionToken<ISeoConfig>('SEO_CONFIG');
```

Update the ```seo.module.ts``` wit the following:

```typescript
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ISeoConfig } from "./interfaces/seo-config.interface";
import { SEO_CONFIG } from "./inject";

@NgModule({
  imports: [CommonModule]
})
export class SeoModule {
  public static forRoot(config: ISeoConfig): ModuleWithProviders<SeoModule> {
    return {
      ngModule: SeoModule,
      providers: [{ provide: SEO_CONFIG, useValue: config }],
    };
  }
}
```
As you can see I added a static forRoot() function. This will enable the configuration for our module.
Next we will create the actual service, go ahead and add a service to the module folder.

```bash
ng g service seo/services/seo/seo
```

First add the following to the constructor

```typescript
constructor(
  @Inject(SEO_CONFIG) private config: ISeoConfig,
  private titleService: Title,
  private metaService: Meta) {
}
```

This will load the injected config and the needed services.


```typescript
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
```


### Conclusion
So the subject was to create a simple seo service for your application.
We did that, but for now you have a starter to extend this module.
 
