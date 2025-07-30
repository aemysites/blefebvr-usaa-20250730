/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct feature items (columns)
  const featureItems = Array.from(element.querySelectorAll(':scope > .usaa-aem-feature-item'));
  const columns = featureItems.map((item) => {
    let content = item.querySelector('.aem-feature-collection__illustration-collection');
    if (!content) {
      const fallbackDiv = item.querySelector(':scope > div');
      return fallbackDiv || item;
    }
    return content;
  });
  // Create the table using createTable
  // The header row must be a single cell, spanning all columns
  // So pass an array with a single string for the header row
  const cells = [
    ['Columns (columns31)'], // header row: one cell, block name exactly
    columns // content row: one cell per column
  ];
  // Use createTable, then set colspan on the th after creation
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Fix header cell colspan so it matches the number of columns
  const th = table.querySelector('th');
  if (th && columns.length > 1) {
    th.setAttribute('colspan', columns.length);
  }
  element.replaceWith(table);
}
