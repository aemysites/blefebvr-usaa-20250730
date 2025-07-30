/* global WebImporter */
export default function parse(element, { document }) {
  // Find all direct feature items within the grid row
  const featureItems = Array.from(element.querySelectorAll(':scope > .usaa-aem-feature-item'));
  if (featureItems.length === 0) return;

  // Each feature item is a column
  const columns = featureItems.map(item => {
    // The visual content is inside the first (and only) child div.
    // We'll reference that div, preserving nested structure.
    const mainDiv = item.querySelector(':scope > div');
    // Fallback to the item itself if the structure is missing
    return mainDiv || item;
  });

  // Table header: block name and variant as in the example
  const header = ['Columns (columns51)'];
  const cells = [header, columns];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
