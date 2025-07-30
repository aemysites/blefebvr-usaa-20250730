/* global WebImporter */
export default function parse(element, { document }) {
  // The header row: one cell with the block name, even if multiple columns are in the content row
  const headerRow = ['Columns (columns6)'];

  // Gather all direct li children (columns)
  const lis = Array.from(element.querySelectorAll(':scope > li'));

  // For each li, include its .card-header (or the li itself if not present)
  const columns = lis.map(li => {
    const cardHeader = li.querySelector('.card-header');
    return cardHeader || li;
  });

  // Build table: header is a single cell, then content row with N columns
  const rows = [
    headerRow,
    columns
  ];

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
