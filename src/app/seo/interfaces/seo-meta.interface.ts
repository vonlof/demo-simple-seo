export interface ISeoMeta{
  title?: string;
  description?: string;
  author?: string;
  keywords?: string | string[];
  type?: 'website' | 'article';
  image?: string;
  schemaData?: Record<string, unknown>;
  currentUrl?: string;
}
