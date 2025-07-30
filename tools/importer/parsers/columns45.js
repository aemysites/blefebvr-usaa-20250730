/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main content wrappers for both columns
  const bg = element.querySelector('.rds-globals__background-secondary');
  if (!bg) return;
  const container = bg.querySelector('.rds-layout__container');
  if (!container) return;
  const group = container.querySelector('.aem-callout-block__illustration-group');
  if (!group) return;

  // Left column: content
  const left = group.querySelector('.aem-callout-block__illustration-group-content');
  // Right column: illustration (image + badge)
  const right = group.querySelector('.aem-callout-block__illustration-group-illustration');

  // Defensive: if columns missing, ensure table structure is kept
  const leftCell = left || document.createElement('div');
  const rightCell = right || document.createElement('div');

  // We need a header row that is a single cell, but there are two content columns.
  // WebImporter.DOMUtils.createTable by default will NOT set colspan automatically on header if row lengths differ.
  // To ensure correct HTML output (single <th> spanning both columns), we'll manually set colspan after creation.
  const cells = [
    ['Columns (columns45)'], // header: single column
    [leftCell, rightCell],   // two content columns
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Set colspan on header cell to match number of columns in content row
  const headerRow = table.querySelector('tr:first-child');
  if (headerRow && headerRow.children.length === 1 && table.rows.length > 1) {
    const colspan = table.rows[1].children.length;
    headerRow.children[0].setAttribute('colspan', colspan);
  }
  element.replaceWith(table);
}
