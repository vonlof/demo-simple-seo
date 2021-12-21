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
