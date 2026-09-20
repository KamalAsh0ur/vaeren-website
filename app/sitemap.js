import { services } from '@/lib/services';
import { locales } from './[lang]/dictionaries';

export default function sitemap() {
  const baseUrl = 'https://vaerenstudios.com';

  const routes = [];

  locales.forEach(lang => {
    // Base route for each language
    routes.push({
      url: `${baseUrl}/${lang}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: lang === 'en' ? 1.0 : 0.9,
    });

    // Service routes for each language
    services.forEach((service) => {
      routes.push({
        url: `${baseUrl}/${lang}/collaborate/${service.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    });
  });

  return routes;
}
