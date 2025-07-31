/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate card columns
  const cards = Array.from(element.querySelectorAll(':scope > .card.product-card'));
  
  // For each card, gather its visible content
  const columns = cards.map(card => {
    const frag = document.createDocumentFragment();
    // Header
    const header = card.querySelector('.product-card-header');
    if (header) frag.appendChild(header);
    // Content
    const content = card.querySelector('.product-card-content');
    if (content) frag.appendChild(content);
    // Footer
    const footer = card.querySelector('.card-footer');
    if (footer) frag.appendChild(footer);
    return frag;
  });

  // Build table: first row is single cell header, second row is columns
  const cells = [
    ['Columns (columns75)'], // header row: single cell
    columns                 // second row: one cell per column
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
