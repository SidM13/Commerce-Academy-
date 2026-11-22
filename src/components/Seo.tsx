import { Helmet } from 'react-helmet-async';
import { site } from '../data/site';

export function Seo({ title, description, path }: { title: string; description: string; path: string }) {
  const url = `${site.url}${path === '/' ? '/' : path}`;
  const fullTitle = path === '/' ? title : `${title} | AGCA – Asha Gyan Commerce Academy`;
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={`${site.url}/og-image.jpg`} />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
}
