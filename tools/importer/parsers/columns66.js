/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container row
  const gridRow = element.querySelector('.rds-layout__grid-row');
  if (!gridRow) return;

  // Select immediate child columns
  const columns = Array.from(gridRow.children).filter(col => col.className && col.className.includes('rds-layout__grid-column'));
  if (columns.length === 0) return;

  // Block name header, exactly as in the requirements
  const headerRow = ['Columns (columns66)'];

  // Place each column as a cell in the content row, referencing the existing elements
  const contentRow = columns;

  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);
  element.replaceWith(table);
}
