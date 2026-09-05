export default function sitemap() {
  return [
    {
      url: 'https://vaerenstudios.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://vaerenstudios.com/work/bolor-brand-collaboration',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://vaerenstudios.com/work/drop-01-structure-comfort',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://vaerenstudios.com/work/drop-02-armored-hoodie',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    }
  ]
}
