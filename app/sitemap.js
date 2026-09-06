export default function sitemap() {
  return [
    {
      url: 'https://vaeren.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://vaeren.vercel.app/work/bolor-brand-collaboration',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://vaeren.vercel.app/work/drop-01-structure-comfort',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://vaeren.vercel.app/work/drop-02-armored-hoodie',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    }
  ]
}
