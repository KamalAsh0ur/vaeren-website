export const projects = [
  {
    slug: 'drop-02-armored-hoodie',
    title: 'V.02 Armored Essential Hoodie',
    client: 'Vaeren Studios',
    type: 'Development',
    work: ['Tech Pack', 'Hardware Design', 'Pattern Making', 'Campaign Direction'],
    year: '2026',
    category: 'DESIGN / DEVELOPMENT',
    thumbnail: '/drop2/shot1.png',
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
      },
      world: {
        title: '03 THE CAMPAIGN',
        description: 'Shot in a sterile, architectural void, the campaign highlights the garment\'s structural independence, heavy-duty hardware, and engineered volume.',
        image: '/drop2/shot3.png'
      }
    },
    techPack: '/drop2/TechPack.pdf'
  },
  {
    slug: 'drop-01-structure-comfort',
    title: 'Structure & Comfort',
    client: 'Vaeren Studios',
    type: 'Drop',
    work: ['Garment Design', 'Product Development', 'Technical Design', 'Production Sourcing'],
    year: '2026',
    category: 'DROPS',
    thumbnail: '/drop1/tech-flats.png',
    sections: {
      concept: {
        title: '01 THE SPEC',
        description: 'Comprehensive technical specification and fabric mapping for the inaugural drop, ensuring consistent structure and precise proportions before prototyping.',
        image: '/drop1/tech-flats.png'
      },
      design: {
        title: '02 THE PATTERN',
        description: 'Custom pattern geometry and grading rules established to maintain the dropped-shoulder, architectural silhouette across all size runs.',
        image: '/drop1/pattern-spec.png'
      },
      world: {
        title: '03 MEASUREMENT STANDARD',
        description: 'Detailed POM (Point of Measure) documentation defining the exact fit tolerances and construction requirements for the heavy-weight fleece.',
        image: '/drop1/pom-spec.png'
      }
    }
  }
];

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug);
}
