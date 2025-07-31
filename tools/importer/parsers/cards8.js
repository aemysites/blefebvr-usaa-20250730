/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare header row, matching the block name exactly as in the example
  const rows = [['Cards (cards8)']];

  // Find all direct card children
  const cards = element.querySelectorAll(':scope > .usaa-aem-article-teaser-child');

  cards.forEach(card => {
    // --- IMAGE CELL ---
    let imageCell = null;
    // Find the <img> inside the adaptive image wrap
    const img = card.querySelector('.adaptive-image-wrap img');
    if (img) {
      imageCell = img; // Reference the img element directly
    } else {
      // If no image is present, leave cell empty to satisfy the 2-column structure
      imageCell = '';
    }

    // --- CONTENT CELL ---
    const content = document.createElement('div');

    // Headline (h3)
    const headline = card.querySelector('.usaa-aem-article-teaser-child__headline h3');
    if (headline) {
      content.appendChild(headline);
    }

    // Description/Meta (p, e.g., "Article: ...")
    const meta = card.querySelector('.usaa-aem-article-teaser-child__media-type');
    if (meta) {
      content.appendChild(meta);
    }

    // CTA (a.rds-button__tertiary)
    const cta = card.querySelector('a.rds-button__tertiary');
    if (cta) {
      // Remove any SVG icons in the CTA
      const svg = cta.querySelector('svg');
      if (svg) svg.remove();
      content.appendChild(cta);
    }

    rows.push([imageCell, content]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
