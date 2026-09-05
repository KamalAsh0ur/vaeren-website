export const projects = [
  {
    slug: 'drop-02-armored-hoodie',
    title: 'V.02 Armored Essential Hoodie',
    client: 'Vaeren Studios',
    type: 'Development',
    work: ['Tech Pack', 'Hardware Design', 'Pattern Making', 'Campaign Direction'],
    year: '2026',
    category: 'DESIGN / DEVELOPMENT',
    thumbnail: '/drop2/flats.png',
    sections: {
      concept: {
        title: '01 THE LOOKBOOK',
        description: 'A comprehensive visual campaign showcasing the V.02 Armored Essential Hoodie from every angle. Exploring movement, lifestyle, and detailed hardware.',
        image: '/drop2/campaign.png'
      },
      design: {
        title: '02 TECHNICAL FLAT',
        description: 'Complete production-facing tech pack including POM grading, hardware specs, and custom wash references.',
        image: '/drop2/flats.png'
      }
    },
    techPack: '/drop2/TechPack.pdf'
  },
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
  }
];

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug);
}
