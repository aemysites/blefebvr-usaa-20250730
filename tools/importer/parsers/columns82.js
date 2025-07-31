/* global WebImporter */
export default function parse(element, { document }) {
  // The header row must be a single cell with the block name, per the example
  const headerRow = ['Columns (columns82)'];

  // Find all immediate child columns
  const featureItems = Array.from(element.querySelectorAll(':scope > div.usaa-aem-feature-item'));

  // For each feature item, grab the text container
  const columns = featureItems.map((item) => {
    const textContainer = item.querySelector('.aem-feature-collection__text');
    return textContainer || item;
  });

  // Construct the table: header row (single cell), then row with one cell per column
  const tableCells = [
    headerRow,
    columns,
  ];

  const block = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(block);
}
