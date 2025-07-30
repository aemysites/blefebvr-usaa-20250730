/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main banner section
  const bannerSection = element.querySelector('section.usaa-aem-banner');
  if (!bannerSection) return;

  // --- 1. Background image row ---
  let backgroundImg = null;
  // Look for .bg-image img
  const bgImg = bannerSection.querySelector('.bg-image img');
  if (bgImg) {
    backgroundImg = bgImg;
  }

  // --- 2. Headline, subheading, CTA row ---
  const contentElements = [];
  // Headline
  const headlineEl = bannerSection.querySelector('.usaa-aem-banner-headline h1');
  if (headlineEl) contentElements.push(headlineEl);
  // Subheading/paragraph
  const subheadingDiv = bannerSection.querySelector('.usaa-aem-banner-text');
  if (subheadingDiv) contentElements.push(subheadingDiv);
  // CTA
  const ctaContainer = bannerSection.querySelector('.cta-container');
  if (ctaContainer) {
    const ctaLink = ctaContainer.querySelector('a');
    if (ctaLink) contentElements.push(ctaLink);
  }

  // Table construction
  const rows = [];
  rows.push(['Hero (hero49)']); // Header: matches example
  rows.push([backgroundImg ? backgroundImg : '']);
  rows.push([contentElements]);

  // Replace element with table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
