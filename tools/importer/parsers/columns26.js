/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find all direct ul children (each represents a column)
  const uls = Array.from(element.querySelectorAll(':scope > ul'));

  // 2. Each ul column: preserve all li structure, including headings
  //    Use the UL element itself as the cell content for semantic preservation

  // 3. Header row as per spec
  const headerRow = ['Columns (columns26)'];

  // 4. Second row: each cell is a <ul> from the element (reference, not clone)
  const columnsRow = uls;

  // 5. Build the cells array
  const cells = [headerRow, columnsRow];

  // 6. Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
