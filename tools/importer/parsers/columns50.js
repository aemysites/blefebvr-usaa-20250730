/* global WebImporter */
export default function parse(element, { document }) {
  // Get the two columns: icon and content
  const iconDiv = element.querySelector('.callout-icon');
  const contentDiv = element.querySelector('.callout-content');

  // If either column is missing, fall back to empty divs for layout
  const col1 = iconDiv || document.createElement('div');
  const col2 = contentDiv || document.createElement('div');

  // Table header as required
  const headerRow = ['Columns (columns50)'];
  // Second row: one cell per column
  const contentRow = [col1, col2];

  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
