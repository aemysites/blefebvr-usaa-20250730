/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid row (contains the two columns)
  const gridRow = element.querySelector('.rds-layout__grid-row');
  if (!gridRow) return;
  // Get all immediate columns inside the grid row
  const cols = gridRow.querySelectorAll(':scope > div');
  if (cols.length < 2) return;
  // Reference the actual column elements (not clones)
  const leftCol = cols[0];
  const rightCol = cols[1];

  // Prepare header
  const headerRow = ['Columns (columns80)'];
  // Build the row with both columns as cells
  const row = [leftCol, rightCol];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    row
  ], document);

  // Replace the original section element with the new table
  element.replaceWith(table);
}
