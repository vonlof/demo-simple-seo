import { InjectionToken } from '@angular/core';
import { ISeoConfig } from './interfaces/seo-config.interface';

export const SEO_CONFIG = new InjectionToken<ISeoConfig>('SEO_CONFIG');
