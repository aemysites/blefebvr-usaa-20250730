/* global WebImporter */
export default function parse(element, { document }) {
  // Correct header row: single cell with block name
  const headerRow = ['Columns (columns24)'];

  // Get columns: immediate ul children
  const columns = Array.from(element.querySelectorAll(':scope > ul'));
  if (!columns.length) return;

  // Content row: one cell per column
  const contentRow = columns;

  // Table structure: header row (1 cell), content row (n cells)
  const tableCells = [
    headerRow,
    contentRow
  ];

  // Create table and replace element
  const block = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(block);
}
