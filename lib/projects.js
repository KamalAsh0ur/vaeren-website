export const projects = [
  {
    slug: 'drop-02-armored-hoodie',
    title: 'V.02 Armored Essential Hoodie',
    client: 'Vaeren Studios',
    type: 'Development',
    work: ['Tech Pack', 'Hardware Design', 'Pattern Making', 'Campaign Direction'],
    year: '2026',
    category: 'DROPS',
    thumbnail: '/drop2/shot1.png',
    sections: {
      concept: {
        title: '01 THE LOOKBOOK',
        description: 'A comprehensive visual campaign showcasing the V.02 Armored Essential Hoodie from every angle. Exploring movement, lifestyle, and detailed hardware.',
        image: '/drop2/campaign.png'
      },
      design: {
        title: '02 THE FIT',
        description: 'Showcasing the engineered volume and heavy-duty hardware in everyday movement.',
        image: '/drop2/shot2.png'
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
    thumbnail: '/drop1/shot1.jpg',
    sections: {
      concept: {
        title: '01 THE LOOKBOOK',
        description: 'Visual campaign exploring the structure and comfort balance in the inaugural drop.',
        image: '/drop1/shot1.jpg'
      },
      design: {
        title: '02 THE SILHOUETTE',
        description: 'Capturing the dropped-shoulder, architectural form across different styling contexts.',
        image: '/drop1/shot2.jpg'
      },
      world: {
        title: '03 VISUAL WORLD',
        description: 'Grounding the heavy-weight fleece in minimalist environments to highlight its precise proportions.',
        image: '/drop1/shot3.jpg'
      }
    }
  },
  {
    slug: 'bolor-brand-collaboration',
    title: 'Vaeren × B0L0R',
    client: 'B0L0R',
    type: 'Brand Collaboration',
    work: ['Garment Design', 'Campaign Direction', 'Brand Partnership'],
    year: '2026',
    category: 'COLLABORATIONS',
    thumbnail: '/bolor/promo.png',
    sections: {
      concept: {
        title: '01 THE PARTNERSHIP',
        description: 'A structural integration of B0L0R\'s minimalist aesthetic with Vaeren\'s signature architectural silhouettes.',
        image: '/bolor/shot1.jpg'
      },
      design: {
        title: '02 GARMENT ARCHITECTURE',
        description: 'Exploring extreme volumes and textured, tech-forward fabrics while retaining everyday wearability.',
        image: '/bolor/shot2.png'
      },
      world: {
        title: '03 VISUAL IDENTITY',
        description: 'The campaign grounds the experimental clothing in sterile, brutalist environments to highlight the stark silhouettes.',
        image: '/bolor/shot3.png'
      },
      extra: {
        title: '04 THE RESULT',
        description: 'High contrast, heavily textured close-ups focusing on the construction and material choices.',
        image: '/bolor/shot4.png'
      }
    }
  },
];
export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug);
}
