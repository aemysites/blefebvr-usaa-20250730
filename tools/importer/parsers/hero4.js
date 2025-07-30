/* global WebImporter */
export default function parse(element, { document }) {
  // Header row with EXACT name
  const headerRow = ['Hero (hero4)'];

  // ----------- Background Image Extraction -----------
  // Find the background image. Prefer the first visible <img> in .bg-image
  let bgImg = null;
  const bgImageDiv = element.querySelector('.bg-image');
  if (bgImageDiv) {
    bgImg = bgImageDiv.querySelector('img');
  }

  // ----------- Structured Content Extraction -----------
  const textContent = [];

  // Headline
  const headlineDiv = element.querySelector('.usaa-aem-banner-headline');
  if (headlineDiv) {
    // Use all children, not just h1, for robustness
    Array.from(headlineDiv.children).forEach(child => textContent.push(child));
  }

  // Paragraph(s)
  const textDiv = element.querySelector('.usaa-aem-banner-text');
  if (textDiv) {
    Array.from(textDiv.children).forEach(child => textContent.push(child));
  }

  // CTA buttons/links (future-proofing, currently empty)
  const ctaDiv = element.querySelector('.cta-container');
  if (ctaDiv && ctaDiv.childElementCount > 0) {
    Array.from(ctaDiv.children).forEach(child => textContent.push(child));
  }

  // ----------- Table Construction -----------
  const cells = [
    headerRow,
    [bgImg ? bgImg : ''],
    [textContent.length ? textContent : '']
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
