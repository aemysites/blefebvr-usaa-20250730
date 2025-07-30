/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main section containing columns
  const section = element.querySelector('section.callout');
  if (!section) return;

  // Get left and right columns
  const left = section.querySelector('.callout-content');
  const right = section.querySelector('.callout-button');
  const contentRow = [];
  if (left) contentRow.push(left);
  if (right) contentRow.push(right);
  if (contentRow.length === 0) return;

  // Header row must be a single cell spanning all columns
  const headerRow = ['Columns (columns40)'];

  const cells = [
    headerRow, // single header cell only
    contentRow // as many cells as there are columns
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
