# Comprehensive Updates

This plan addresses both the SEO optimizations and the missing images on the mobile case study layout.

## 1. SEO Implementation
We will properly implement dynamic meta tags and Open Graph data for social sharing:
- **`app/layout.jsx`**: Update the base metadata to reflect the correct standard.
- **`app/page.jsx`**: Add `export const metadata` for the homepage.
- **`app/work/[slug]/page.jsx`**: Use `export async function generateMetadata({ params })` to dynamically pull the project title, description, and thumbnail, ensuring each case study has its own SEO footprint.
- **Image `alt` tags**: Verify and add robust descriptive `alt` tags to any image missing them in `SelectedWorkSection` and `ArchiveLoopSection`.

## 2. Drop Images Fix (Mobile & Content)
- **Content completeness**: Drop 2 has 4 images (`campaign`, `shot1`, `shot2`, `shot3`). Currently, `shot1` is only used as a thumbnail. I will add an `extra` section to Drop 2 in `lib/projects.js` so all 4 images display on the project page.
- **Mobile Visibility Bug**: The GSAP `clipPath` scroll reveal sometimes fails to trigger on mobile devices if the elements are stacked tightly, leaving the image permanently hidden (which is why you only see 2 images). I will wrap the reveal animation in a `gsap.matchMedia("(min-width: 768px)")` block in `ProjectLayout.jsx` so that images fade in smoothly but without the restrictive masking on mobile, ensuring 100% visibility.

## Verification
- Deploy to Vercel and verify the `<title>` and `<meta>` tags via view-source.
- Test the layout on a mobile viewport simulation to guarantee all 3-4 images render correctly without being clipped by GSAP.

