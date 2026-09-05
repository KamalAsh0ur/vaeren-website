export const projects = [
  {
    slug: 'drop-01-structure-comfort',
    title: 'Structure & Comfort',
    client: 'Vaeren Studios',
    type: 'Drop',
    work: ['Creative Direction', 'Garment Design', 'Product Development', 'Campaign'],
    year: '2026',
    category: 'DROPS',
    thumbnail: '/drop1/shot1.jpg',
    sections: {
      concept: {
        title: '01 THE IDEA',
        description: 'We started with a simple premise: how do we translate the permanence of Brutalist architecture into an everyday garment without sacrificing comfort?',
        image: '/drop1/shot1.jpg'
      },
      design: {
        title: '02 THE DESIGN',
        description: 'Heavyweight custom-milled cotton, engineered seams, and a silhouette designed to hold its shape completely independently of the wearer.',
        image: '/drop1/shot2.jpg'
      },
      world: {
        title: '03 THE WORLD',
        description: 'The visual identity and campaign were shot in stark, natural environments to contrast the rigid geometry of the clothing.',
        image: '/drop1/shot3.jpg'
      },
      reel: '/drop1/reel.mp4'
    }
  },
  {
    slug: 'drop-02-armored-essential-hoodie',
    title: 'Armored Essential',
    client: 'Vaeren Studios',
    type: 'Drop',
    work: ['Garment Design', 'Tech Pack Development', 'Campaign', 'Visual Direction'],
    year: '2026',
    category: 'DROPS',
    thumbnail: '/drop2/campaign.png',
    sections: {
      concept: {
        title: '01 THE IDEA',
        description: 'The V.02 Armored Essential Hoodie was born from the desire to create an outerwear-grade hoodie. An engineered, drop-shoulder silhouette with structured arm overlays for protection and shape retention.',
        image: '/drop2/campaign.png'
      },
      design: {
        title: '02 THE DESIGN',
        description: 'Built from 400-450 GSM French terry with a controlled vintage wash. The design features a cropped body, structured hood, half-zip placket, and raw-edge panel details anchored by custom gunmetal rivets.',
        image: '/drop2/flats.png'
      },
      world: {
        title: '03 THE WORLD',
        description: 'The campaign emphasizes the rigid structure of the garment through strong, low-angle perspectives and a stark, brutalist aesthetic. Included is a complete production tech pack defining the construction constraints.',
        image: '/drop2/campaign.png'
      },
      document: '/drop2/techpack.pdf'
    }
  }
];

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug);
}
