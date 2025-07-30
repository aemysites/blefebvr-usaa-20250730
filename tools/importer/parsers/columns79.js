/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row with exact block name
  const headerRow = ['Columns (columns79)'];

  // 2. Prepare the columns array
  // Find the grid columns (main content & illustration)
  const gridRow = element.querySelector('.rds-layout__grid-row');
  let leftCell = '';
  let rightCell = '';

  if (gridRow) {
    const gridColumns = gridRow.querySelectorAll(':scope > div');
    // LEFT COLUMN: heading, paragraph, button
    if (gridColumns.length > 0) {
      const leftCol = gridColumns[0];
      // We'll extract all direct children
      const leftParts = [];
      const h1 = leftCol.querySelector('h1');
      if (h1) leftParts.push(h1);
      const p = leftCol.querySelector('p');
      if (p) leftParts.push(p);
      // Add the button (anchor)
      const btn = leftCol.querySelector('a');
      if (btn) leftParts.push(btn);
      leftCell = leftParts.length > 0 ? leftParts : '';
    }
    // RIGHT COLUMN: illustration image
    if (gridColumns.length > 1) {
      const rightCol = gridColumns[1];
      const img = rightCol.querySelector('img');
      rightCell = img ? img : '';
    }
  }

  // Build the table rows
  const rows = [
    headerRow,
    [leftCell, rightCell],
  ];

  // 3. Create the block and replace
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
