/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct ul children (columns)
  const columns = Array.from(element.querySelectorAll(':scope > ul'));
  // Defensive: if no columns found, do nothing
  if (!columns.length) return;
  // Build the cells: header row must be a single cell (one column), then one row with as many columns as needed
  const headerRow = ['Columns (columns32)'];
  const contentRow = columns;
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
