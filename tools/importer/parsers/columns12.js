/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct child li.card elements (each column)
  const cards = Array.from(element.querySelectorAll(':scope > li'));

  // For each card, get its visible content block
  const columns = cards.map(card => {
    // Grab everything inside .card-header if present, else the card itself
    const content = card.querySelector('.card-header') || card;
    return content;
  });

  // Build table: header row is one cell; second row is N cells (columns)
  const cells = [
    ['Columns (columns12)'], // Header row: ONE cell only
    columns                  // Second row: multiple cells, one for each card
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
