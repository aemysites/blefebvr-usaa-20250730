/* global WebImporter */
export default function parse(element, { document }) {
  // Find the two main columns
  const content = element.querySelector('.callout-content');
  const cta = element.querySelector('.callout-cta');

  // Defensive: ensure columns always exist as cells, empty div if not
  const col1 = content || document.createElement('div');
  const col2 = cta || document.createElement('div');

  // Ensure the header row is a single cell, matching the example
  const cells = [
    ['Columns (columns72)'], // header row: one cell only
    [col1, col2],            // content row: two columns
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
