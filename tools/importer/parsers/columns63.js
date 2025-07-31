/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for Columns (columns63)
  const cells = [ [ 'Columns (columns63)' ] ];

  // The section has two main direct children: icon div and content div
  const children = element.querySelectorAll(':scope > div');
  let iconDiv = null;
  let contentDiv = null;

  if (children.length > 0) {
    iconDiv = children[0];
  }
  if (children.length > 1) {
    contentDiv = children[1];
  }
  // Defensive fallback if contentDiv is missing
  if (!iconDiv && !contentDiv) {
    // If nothing to show, remove element and return
    element.remove();
    return;
  }

  // Second row: each child into a column, always two columns in this layout
  cells.push([
    iconDiv || '',
    contentDiv || ''
  ]);

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
