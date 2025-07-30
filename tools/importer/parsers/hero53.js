/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row: block name exactly as in example
  const headerRow = ['Hero (hero53)'];

  // 2. Background image (desktop preferred)
  let bgImg = null;
  const imgWrap = element.querySelector('.banner-img-wrap');
  if (imgWrap) {
    bgImg = imgWrap.querySelector('img:not(.mobile-only)') || imgWrap.querySelector('img');
  }
  const imageRow = [bgImg ? [bgImg] : []];

  // 3. Content row (preserve heading level, all text, CTA)
  const contentDiv = element.querySelector('.banner-content');
  const contentCells = [];
  if (contentDiv) {
    // Title (as heading)
    const h1 = contentDiv.querySelector('.banner-accent-heading');
    if (h1) contentCells.push(h1);
    // Subheading (as subheading)
    const h2 = contentDiv.querySelector('.banner-sub-heading');
    if (h2) contentCells.push(h2);
    // Supporting text
    const info = contentDiv.querySelector('.banner-sub-info');
    if (info) contentCells.push(info);
    // CTA button (link)
    const ctaBtn = contentDiv.querySelector('.cta-btn');
    if (ctaBtn) contentCells.push(ctaBtn);
    // Secondary link (retrieve quote)
    const ctaLink = contentDiv.querySelector('.cta-link');
    if (ctaLink) contentCells.push(ctaLink);
  }
  const contentRow = [contentCells];

  // Build the cells array (1 col, 3 rows as per spec)
  const cells = [headerRow, imageRow, contentRow];
  
  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
