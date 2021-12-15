import {Injectable} from '@angular/core';
import {ISeoMeta} from '../../interfaces/seo-meta.interface';

@Injectable({
  providedIn: 'root',
})
export class SeoService {

  public update(meta: ISeoMeta, index = true) {
    // this.metaService.updatePageMetaData(metaData, index);
  }
}
