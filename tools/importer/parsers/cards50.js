/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as in example
  const headerRow = ['Cards (cards50)'];

  // Each card is a .usaa-aem-card-ac direct child
  const cardEls = Array.from(element.querySelectorAll(':scope > .usaa-aem-card-ac'));
  const rows = [headerRow];

  cardEls.forEach(card => {
    // Image: try to get card .adaptive-image-wrap img
    let img = card.querySelector('.adaptive-image-wrap img');
    if (!img) img = card.querySelector('img'); // fallback

    // Text cell: heading, body, CTA
    const textParts = [];

    // Heading (keep the heading element itself)
    const heading = card.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) textParts.push(heading);

    // Description (grab all <p> in .usaa-aem-card-ac__text, as in example one paragraph)
    const bodyWrap = card.querySelector('.usaa-aem-card-ac__text');
    if (bodyWrap) {
      const ps = Array.from(bodyWrap.querySelectorAll('p'));
      if (ps.length > 0) {
        textParts.push(...ps);
      } else {
        textParts.push(bodyWrap);
      }
    }

    // CTA (only the <a>, not the SVG or visually hidden content)
    const ctaBlock = card.querySelector('.usaa-aem-card-ac__action-block');
    if (ctaBlock) {
      const cta = ctaBlock.querySelector('a');
      if (cta) textParts.push(cta);
    }

    rows.push([
      img,
      textParts
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
