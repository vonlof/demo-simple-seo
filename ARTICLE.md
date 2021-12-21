# Creating a simple Angular SEO service

### How to build a simple SEO wrapper for an angular frontend application, without a library ;)

![title](angular-seo.png)

In this article we are going to create a simple seo module, what will combine useful seo functions for your web application. The service will handle the followings:

1. Default meta definitions like title, description and keywords
2. Open graph meta definitions like og:title, og:description etc.

Before we dive into this we need to know what SEO is. SEO stands for search engine optimization. It is a process of taking steps to help a website or piece of content rank higher on Google. The difference between SEO and paid advertising is that SEO involves “organic” ranking, which means you don’t have to pay.

To make it a bit simpler, search engine optimization means taking a piece of online content and optimizing it so search engines like Google show it towards the top of the page when someone searches for something.

## Okay, that is defined, let's get started.

First (If you don't have a project yet) we will generate a new fresh Angular project, in your terminal generate as follow:

```bash
ng new demo-simple-seo
```

We want to keep the project neat and tidy. So for that we are going to use modules. When all the dependencies are installed, and you have your favorite editor open add a new module named seo.

```bash
ng g module seo
```
Your folder structure will look something like:

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
Within this module we are going to create a Config Injector. I use this to configure the service on the module level. This is usefull for mono repo's, or custom packages.

Start by creating a file named ```interfaces/seo-config.interface.ts```
Add the following to this file:

```typescript
export interface ISeoConfig {
  siteName: string;
  siteUrl: string;
  image?: string;
}
```
The we create a ```inject.ts``` file with the following:

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

```


### Conclusion
So the subject was to create a simple seo service for your application.
We did that, but for now you have a starter to extend this module.
 
