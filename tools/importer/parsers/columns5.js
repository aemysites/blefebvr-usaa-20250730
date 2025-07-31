/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid row and columns
  const gridRow = element.querySelector('.rds-layout__grid-row');
  if (!gridRow) return;
  const columns = gridRow.querySelectorAll(':scope > div');
  if (columns.length < 2) return;

  // Extract all children from the first column
  const firstCol = Array.from(columns[0].children);
  const firstColContent = firstCol.length ? firstCol : [''];

  // Extract all children from the second column (or fallback to empty string)
  const secondCol = Array.from(columns[1].children);
  const secondColContent = secondCol.length ? secondCol : [''];

  // Compose the required table structure
  // Header row: one cell only
  const cells = [
    ['Columns (columns5)'],
    [firstColContent, secondColContent],
  ];

  // Create the table and replace the element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
