/* global WebImporter */
export default function parse(element, { document }) {
  // Get content for column 1: callout-content (heading and p)
  const contentDiv = element.querySelector('.callout-content') || document.createElement('div');
  // Get content for column 2: callout-cta (cta link)
  const ctaDiv = element.querySelector('.callout-cta') || document.createElement('div');

  // The number of columns is determined by the number of content columns (2 in this case)
  const numColumns = 2;
  // For correct spanning visually, the header row must be a single cell, just as in the markdown example
  // The WebImporter.DOMUtils.createTable will create a <th> row with one cell, which is correct
  // The table consumer should visually render a one-cell header over n columns

  const headerRow = ['Columns (columns13)'];
  const contentRow = [contentDiv, ctaDiv];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}