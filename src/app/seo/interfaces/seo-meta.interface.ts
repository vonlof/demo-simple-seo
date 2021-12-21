export interface ISeoMetaData {
  title?: string;
  description?: string;
  keywords?: string | string[];
  author?: string;
  type?: 'website' | 'article';
  image?: string;
  currentUrl?: string;
}
