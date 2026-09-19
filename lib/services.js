export const services = {
  'design-with-us': {
    id: '01',
    slug: 'design-with-us',
    title: 'Design With Us',
    catalogTitle: 'Design With Us — Product Development',
    hero: {
      subtitle: 'You have the brand.',
      title: 'We create the product.',
      sentence: 'We work with you to develop the complete product concept—from silhouettes to materials and factory-ready specifications.'
    },
    positioning: "A garment isn't finished when it looks good.",
    positioningDescription: "It's finished when the idea survives production. We translate aesthetic direction into physical, factory-ready reality.",
    capabilities: [
      'GARMENT DESIGN',
      'PATTERN DEVELOPMENT',
      'TECHNICAL DESIGN',
      'MATERIALS & TRIMS',
      'CONSTRUCTION',
      'PRODUCTION DEVELOPMENT'
    ],
    process: [
      { num: '01', title: 'DIRECTION', desc: 'Understand the brand and define the product.' },
      { num: '02', title: 'DEVELOPMENT', desc: 'Turn the idea into a buildable garment.' },
      { num: '03', title: 'REFINEMENT', desc: 'Samples, construction, materials and details.' },
      { num: '04', title: 'PRODUCTION', desc: 'Prepare the product for manufacturing.' }
    ],
    workImages: [
      { src: '/drop2/flats.webp', caption: 'TECHNICAL DEVELOPMENT', full: true },
      { src: '/drop1/pattern-spec.webp', caption: 'PATTERN GRADING', aspect: 'aspect-[3/4]' },
      { src: '/drop1/pom-spec.webp', caption: 'CONSTRUCTION SPECS', aspect: 'aspect-[3/4]' }
    ],
    caseStudy: {
      title: 'V.02 — Armored Essential Hoodie',
      project: 'Vaeren Studios',
      scope: ['Tech Pack', 'Hardware Design', 'Pattern Making', 'Campaign Direction'],
      link: '/work/drop-02-armored-hoodie',
      images: [
        { src: '/drop2/shot1.webp', caption: 'GARMENT PROTOTYPE', full: true },
        { src: '/drop2/shot2.webp', caption: 'HARDWARE DETAIL' },
        { src: '/drop2/campaign.webp', caption: 'FINAL CAMPAIGN' }
      ]
    },
    cta: {
      prompt: 'Something worth making?',
      button: 'Start a project'
    }
  },

  'build-the-world': {
    id: '02',
    slug: 'build-the-world',
    title: 'Build The World',
    catalogTitle: 'Build The World — Creative Direction',
    hero: {
      subtitle: 'You have the product.',
      title: 'We build everything around it.',
      sentence: 'We create the visual language that gives it meaning—from art direction and photography to campaign concepts.'
    },
    positioning: "A product without a world is just fabric.",
    positioningDescription: "We build the visual language that makes your brand unmistakable.",
    capabilities: [
      'ART DIRECTION',
      'PHOTOGRAPHY',
      'STYLING',
      'SET DESIGN',
      'MOTION',
      'CAMPAIGN NARRATIVE'
    ],
    process: [
      { num: '01', title: 'CONCEPT', desc: 'Define the visual narrative.' },
      { num: '02', title: 'PRODUCTION', desc: 'Scout, cast, set design, and shoot.' },
      { num: '03', title: 'REFINEMENT', desc: 'Post-production, grading, and editing.' },
      { num: '04', title: 'DELIVERY', desc: 'Final campaign toolkit and assets.' }
    ],
    workImages: [
      { src: '/drop1/shot3.webp', caption: 'VISUAL WORLD', full: true },
      { src: '/drop1/shot1.webp', caption: 'PHOTOGRAPHY', aspect: 'aspect-square' },
      { src: '/drop1/shot2.webp', caption: 'STYLING', aspect: 'aspect-[4/5]' }
    ],
    caseStudy: {
      title: 'Vaeren × B0L0R Visual Identity',
      project: 'B0L0R',
      scope: ['Campaign Concept', 'Art Direction', 'Photography'],
      link: '/work/bolor-brand-collaboration',
      images: [
        { src: '/bolor/promo.webp', caption: 'CAMPAIGN DIRECTION', full: true },
        { src: '/bolor/shot1.webp', caption: 'EDITORIAL' },
        { src: '/bolor/shot2.webp', caption: 'LOOKBOOK' }
      ]
    },
    cta: {
      prompt: 'You have the idea. Let\'s make it real.',
      button: 'Start a collaboration'
    }
  },

  'create-together': {
    id: '03',
    slug: 'create-together',
    title: 'Create Together',
    catalogTitle: 'Create Together — Brand Development',
    hero: {
      subtitle: 'Start with an idea.',
      title: 'Build the whole thing.',
      sentence: 'We develop the idea with you from the ground up—product, brand identity, visual language, website, and launch.'
    },
    positioning: "Nothing is fully defined yet. That's exactly where we come in.",
    positioningDescription: "We partner with you to develop the brand from scratch. Product, identity, world, and go-to-market.",
    capabilities: [
      'BRAND STRATEGY',
      'IDENTITY DESIGN',
      'APPAREL DEVELOPMENT',
      'CREATIVE DIRECTION',
      'WEB ARCHITECTURE',
      'GO-TO-MARKET'
    ],
    process: [
      { num: '01', title: 'DNA', desc: 'Establish brand identity and positioning.' },
      { num: '02', title: 'PRODUCT', desc: 'Simultaneous product and digital development.' },
      { num: '03', title: 'WORLD', desc: 'Unite everything through a visual campaign.' },
      { num: '04', title: 'LAUNCH', desc: 'Go-to-market execution and rollout.' }
    ],
    workImages: [
      { src: '/bolor/promo.webp', caption: 'BRAND IDENTITY', full: true },
      { src: '/drop2/flats.webp', caption: 'PRODUCT DEVELOPMENT', aspect: 'aspect-video' },
      { src: '/drop2/campaign.webp', caption: 'CAMPAIGN ROLLOUT', aspect: 'aspect-[21/9]', full: true }
    ],
    caseStudy: {
      title: 'Structure & Comfort Rollout',
      project: 'Vaeren Studios',
      scope: ['Brand Strategy', 'Garment Design', 'Campaign Direction', 'E-Commerce'],
      link: '/work/drop-01-structure-comfort',
      images: [
        { src: '/drop1/shot1.webp', caption: 'FULL ROLLOUT', full: true },
        { src: '/drop1/shot2.webp', caption: 'PRODUCT' },
        { src: '/drop1/shot3.webp', caption: 'WORLD' }
      ]
    },
    cta: {
      prompt: 'Have something in mind? Let\'s build it.',
      button: 'Start a project'
    }
  },

  'launch-with-us': {
    id: '04',
    slug: 'launch-with-us',
    title: 'Launch With Us',
    catalogTitle: 'Launch With Us — Brand Growth',
    hero: {
      subtitle: 'Your brand is ready.',
      title: 'Now let\'s put it in front of people.',
      sentence: 'We build the digital layer that connects your creative with the right audience.'
    },
    positioning: "We don't see media as simply buying ads.",
    positioningDescription: "It's the bridge between what you create and what people do next. We architect conversion.",
    capabilities: [
      'LANDING PAGES',
      'AD CREATIVE',
      'PAID MEDIA',
      'FUNNEL DESIGN',
      'CONVERSION OPTIMIZATION',
      'PERFORMANCE TRACKING'
    ],
    process: [
      { num: '01', title: 'AUDIT', desc: 'Analyze data and set up tracking infrastructure.' },
      { num: '02', title: 'BUILD', desc: 'Design conversion-optimized funnels.' },
      { num: '03', title: 'LAUNCH', desc: 'Deploy ad creatives and manage media spend.' },
      { num: '04', title: 'SCALE', desc: 'Optimize variations to maximize return.' }
    ],
    workImages: [
      { src: '/drop2/campaign.webp', caption: 'CAMPAIGN CREATIVE', full: true },
      { src: '/bolor/shot3.webp', caption: 'MEDIA ASSETS', aspect: 'aspect-[4/5]' },
      { src: '/drop1/shot1.webp', caption: 'LANDING PAGE VISUALS', aspect: 'aspect-square' }
    ],
    caseStudy: {
      title: 'Drop 02 Go-To-Market',
      project: 'Vaeren Studios',
      scope: ['Landing Page', 'Media Buying', 'Conversion Strategy'],
      link: '/work/drop-02-armored-hoodie',
      images: [
        { src: '/drop2/shot3.webp', caption: 'CAMPAIGN ASSETS', full: true },
        { src: '/drop2/shot2.webp', caption: 'AD CREATIVE A' },
        { src: '/drop2/shot1.webp', caption: 'AD CREATIVE B' }
      ]
    },
    cta: {
      prompt: 'Ready to scale?',
      button: 'Start a project'
    }
  },

  'something-else': {
    id: '05',
    slug: 'something-else',
    title: 'Something Else',
    catalogTitle: 'Something Else — Custom Projects',
    hero: {
      subtitle: 'Have an idea that doesn\'t',
      title: 'fit a category?',
      sentence: 'Good. Not every project needs to fit inside a predefined service. Bring us the problem.'
    },
    positioning: "Have an idea that doesn't fit the menu? Good.",
    positioningDescription: "Bring us the problem, the reference, the half-built idea—or nothing but the instinct that something should exist. We'll figure out what it needs.",
    capabilities: [
      'CUSTOM PROJECTS',
      'PHYSICAL INSTALLATIONS',
      'EXPERIMENTAL DIGITAL',
      'LIMITED COLLABORATIONS',
      'STRATEGIC PIVOTS'
    ],
    process: [
      { num: '01', title: 'DISSECT', desc: 'Understand the specific ambition.' },
      { num: '02', title: 'ASSEMBLE', desc: 'Build the custom workflow.' },
      { num: '03', title: 'EXPERIMENT', desc: 'Test, break, and refine.' },
      { num: '04', title: 'DELIVER', desc: 'Output the tangible solution.' }
    ],
    workImages: [
      { src: '/drop2/shot1.webp', caption: 'HARDWARE R&D', full: true },
      { src: '/bolor/shot4.webp', caption: 'MATERIAL EXPERIMENTS', aspect: 'aspect-square' },
      { src: '/drop1/pattern-spec.webp', caption: 'UNCONVENTIONAL PROTOTYPING', aspect: 'aspect-square' }
    ],
    caseStudy: {
      title: 'Experimental Work',
      project: 'Various',
      scope: ['Abstract Concepts', 'Hardware R&D', 'Unconventional Rollouts'],
      link: null,
      images: [
        { src: '/bolor/shot2.webp', caption: 'STRUCTURAL TESTS', full: true },
        { src: '/drop1/pom-spec.webp', caption: 'TECHNICAL BREAKDOWNS' },
        { src: '/drop2/flats.webp', caption: 'PROCESS' }
      ]
    },
    cta: {
      prompt: 'Something worth making?',
      button: 'Bring us the idea'
    }
  }
};
