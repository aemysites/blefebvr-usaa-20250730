/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: single cell with the block name
  const headerRow = ['Columns (columns37)'];

  // Get all card items representing columns
  const cards = Array.from(element.querySelectorAll(':scope > li.card'));
  if (!cards.length) return;

  // Each card's content is the .card-header div if exists, otherwise the card itself
  const cellContent = cards.map(card => {
    const headerDiv = card.querySelector('.card-header');
    return headerDiv ? headerDiv : card;
  });

  // Second row: all column cell contents as a single array
  const cells = [
    headerRow,           // Header row: 1 column
    [ ...cellContent ]   // Content row: 1 cell per column
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
