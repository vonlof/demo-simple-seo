# Creating a simple Angular SEO service

### How to build a simple SEO wrapper for an angular frontend application, without a library ;)

![title](angular-seo.png)

In this article we are going to create a simple seo module, what will combine useful seo functions for your web application. The service will handle the followings:

1. Default meta definitions like title, description and keywords
2. Open graph meta definitions like og:title, og:description etc.
3. Jsonld schema's

Before we dive into this we need to know what SEO is. SEO stands for search engine optimization. It is a process of taking steps to help a website or piece of content rank higher on Google. The difference between SEO and paid advertising is that SEO involves “organic” ranking, which means you don’t have to pay.

To make it a bit simpler, search engine optimization means taking a piece of online content and optimizing it so search engines like Google show it towards the top of the page when someone searches for something.

## Okay, that is defined, let's get started.

Firstly (If you don't have a project yet) we will generate a new fresh Angular project, in your terminal generate as follow:

```bash
ng new simple-seo
```

We want to keep the project neatly and tidy. For that we are going to use modules. When all the dependecies are installed and you have your favorite editor open, add a new module name seo.

```bash
ng g module seo
```
Your folder structure will look like the following

```editor
simple-seo
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
Within this module we are going to create an Config Injector. I use this mainly to config the servie on the module level. This is usefull for mono repo's, or you could write your own package and reuse it anywhere.

Start by creating a file named `interfaces/seo-config.interface.ts`
With the following contents:

```typescript
export interface ISeoConfig {
  siteName: string;
  siteUrl: string;
  image?: string;
}
```
The we create a `inject.ts` file the following:

```typescript
import { InjectionToken } from '@angular/core';
import { ISeoConfig } from './interfaces/seo-config.interface';

export const SEO_CONFIG = new InjectionToken<ISeoConfig>('SEO_CONFIG');
```

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
As you can see I added a static forRoot() function. This will enable the basic configuration of our module.
