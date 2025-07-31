/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate child divs (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // Header row: single cell with the block name
  const headerRow = ['Columns (columns34)'];
  // Content row: each column as a cell
  const contentRow = columns;
  // Build the table: single-cell header row, then content row with N columns
  const tableData = [headerRow, contentRow];
  // Create the table
  const table = WebImporter.DOMUtils.createTable(tableData, document);
  // Replace the original element
  element.replaceWith(table);
}