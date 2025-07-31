/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as specified in the block name
  const rows = [['Cards (cards62)']];

  // Select all card containers
  const cards = element.querySelectorAll(':scope > .usaa-aem-card-ac');

  cards.forEach(card => {
    // First cell: Icon/Image (reference existing img element)
    const iconImg = card.querySelector('.usaa-aem-card-ac__icon img');

    // Second cell: Text content
    const textParts = [];

    // Title (h3)
    const h3 = card.querySelector('.rds-layout--bottom-3 h3');
    if (h3) {
      textParts.push(h3);
    }

    // Description (p)
    const desc = card.querySelector('.usaa-aem-card-ac__text p');
    if (desc) {
      textParts.push(desc);
    }

    // CTA link (a)
    const cta = card.querySelector('.usaa-aem-card-ac__action-block a');
    if (cta) {
      // Remove any inline svg icons (directional arrow)
      cta.querySelectorAll('svg').forEach(svg => svg.remove());
      textParts.push(cta);
    }

    // Add this card as a row to the table
    rows.push([
      iconImg || '',
      textParts.length === 1 ? textParts[0] : textParts
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
