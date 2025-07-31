/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: exactly one column, matching the example
  const headerRow = ['Columns (columns71)'];

  // Find content and image columns robustly
  const banner = element.querySelector('.banner');
  let col1, col2;

  if (banner) {
    col1 = banner.querySelector('.banner-content');
    col2 = banner.querySelector('.banner-img-wrap');
  } else {
    const divs = element.querySelectorAll(':scope > div');
    col1 = divs[0] || '';
    col2 = divs[1] || '';
  }

  // The rows array: header is a single cell, second row is two columns
  const cells = [
    headerRow,
    [col1 || '', col2 || '']
  ];

  // Create table and replace original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
