/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the three UL columns
  const columns = Array.from(element.querySelectorAll(':scope > ul'));
  if (!columns.length) return;

  // Create a single header cell spanning all columns
  const headerRow = ['Columns (columns32)'];

  // Content row: each column's content goes into its own cell
  const contentRow = columns.map(ul => ul);

  // Assemble the table rows: one header cell, then content row with N columns
  const tableCells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(table);
}
