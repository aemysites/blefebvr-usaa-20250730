/* global WebImporter */
export default function parse(element, { document }) {
  // The header row should be a single cell/column
  const headerRow = ['Columns (columns28)'];

  // Find the two main columns in the original block
  const imageCol = element.querySelector('.fifty-fifty-wrapping-image');
  const textCol = element.querySelector('.fifty-fifty-wrapping-text');

  // Defensive: fallback to empty div if a column is missing
  const textCell = textCol || document.createElement('div');
  const imageCell = imageCol || document.createElement('div');

  // Remove the mobile-only image from the image cell
  if (imageCell.querySelectorAll) {
    Array.from(imageCell.querySelectorAll('img.mobile-only')).forEach(img => img.remove());
  }

  // The header row is a single cell; the content row is an array of the two columns
  const cells = [
    headerRow,
    [textCell, imageCell]
  ];

  // Create the table block and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
