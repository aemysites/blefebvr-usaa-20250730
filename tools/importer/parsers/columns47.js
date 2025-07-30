/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as per block name
  const headerRow = ['Columns (columns47)'];

  // Get the left icon div (with the image)
  const iconDiv = element.querySelector('.callout-icon');
  // Get the right content div (with heading, text, link)
  const contentDiv = element.querySelector('.callout-content');

  // If either column is missing, substitute with an empty string to avoid errors
  const leftCell = iconDiv || '';
  const rightCell = contentDiv || '';

  // Compose the table structure
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    [leftCell, rightCell]
  ], document);

  element.replaceWith(table);
}
