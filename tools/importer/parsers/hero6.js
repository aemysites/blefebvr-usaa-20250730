/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row (block name exactly as in example)
  const headerRow = ['Hero (hero6)'];

  // 2. Background image: get first <img> inside .bg-image (if any)
  let bgImage = '';
  const bgDiv = element.querySelector('.bg-image');
  if (bgDiv) {
    const img = bgDiv.querySelector('img');
    if (img) {
      bgImage = img;
    }
  }

  // 3. Gather all headline, paragraphs, and CTA links/buttons for text content
  //    Use order of appearance as in DOM to match semantic grouping
  const contentParts = [];
  // Get all direct children of .rds-layout__container (for robustness)
  const layoutContainer = element.querySelector('.rds-layout__container');
  if (layoutContainer) {
    // Get all text elements and CTAs in visual order
    // All main textual content is within the first .rds-layout__grid-row
    const firstRow = layoutContainer.querySelector('.rds-layout__grid-row');
    if (firstRow) {
      // Headline (h1-h6)
      firstRow.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(h => contentParts.push(h));
      // Paragraphs
      firstRow.querySelectorAll('p').forEach(p => contentParts.push(p));
    }
    // CTA button/link: it's in a sibling .cta-container
    const cta = layoutContainer.querySelector('.cta-container a');
    if (cta) {
      contentParts.push(cta);
    }
  }
  // Fallback: if contentParts is empty, fallback to all h1-h6, p, a under element (to ensure no text is missed)
  if (contentParts.length === 0) {
    element.querySelectorAll('h1, h2, h3, h4, h5, h6, p, a').forEach(e => contentParts.push(e));
  }

  // 4. Build the rows, 1 column each as per requirements
  const rows = [
    headerRow,
    [bgImage || ''],
    [contentParts.length ? contentParts : ['']]
  ];

  // 5. Create table and replace element
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}