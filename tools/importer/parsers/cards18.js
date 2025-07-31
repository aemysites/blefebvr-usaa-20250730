/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to create card row contents
  function buildCardRow(cardEl) {
    // No image/icon in this HTML, image cell must be empty
    const imageCell = '';

    // Text content cell: header, content, footer
    const textCellContents = [];
    const header = cardEl.querySelector('.product-card-header');
    if (header) {
      const h3 = header.querySelector('h3');
      if (h3) textCellContents.push(h3);
    }
    const content = cardEl.querySelector('.product-card-content');
    if (content) textCellContents.push(content);
    const footer = cardEl.querySelector('.card-footer');
    if (footer) textCellContents.push(footer);
    return [imageCell, textCellContents];
  }

  // Build the cards block table
  const rows = [];
  rows.push(['Cards (cards18)']);
  const cards = element.querySelectorAll(':scope > .card.product-card');
  cards.forEach(card => {
    rows.push(buildCardRow(card));
  });

  // Replace original element with block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
