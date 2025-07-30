/* global WebImporter */
export default function parse(element, { document }) {
  // Build header row for the block
  const headerRow = ['Cards (cards16)'];
  const rows = [headerRow];

  // Find all immediate card children
  const cards = element.querySelectorAll(':scope > .usaa-aem-article-teaser-child');
  cards.forEach(card => {
    // IMAGE CELL
    let img = card.querySelector('img');
    const imgCell = img ? img : '';

    // TEXT CONTENT CELL
    const contentParts = [];
    // Title (keep heading level and text)
    const headlineWrap = card.querySelector('.usaa-aem-article-teaser-child__headline');
    if (headlineWrap) {
      const headline = Array.from(headlineWrap.children).find(el => /^H[1-6]$/i.test(el.tagName));
      if (headline) {
        contentParts.push(headline);
      }
    }
    // Description/Meta
    const meta = card.querySelector('.usaa-aem-article-teaser-child__media-type');
    if (meta) {
      contentParts.push(meta);
    }
    // CTA link (Read article), if present
    const ctaGroup = card.querySelector('.rds-button__group');
    if (ctaGroup) {
      const cta = ctaGroup.querySelector('a');
      if (cta) {
        // Remove SVG from the link (if present)
        const svg = cta.querySelector('svg');
        if (svg) svg.remove();
        contentParts.push(cta);
      }
    }
    // Compose the row (image | text cell)
    rows.push([imgCell, contentParts]);
  });

  // Create the block table and replace the original element
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}