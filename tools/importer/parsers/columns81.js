/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find all the direct children that are columns
  const items = Array.from(element.querySelectorAll(':scope > .usaa-aem-feature-item'));

  // 2. Build cells for each column by collecting the heading and paragraph
  const columnCells = items.map((item) => {
    const textContainer = item.querySelector('.aem-feature-collection__text');
    // We'll collect all children (h3 + paragraph div)
    const colContent = [];
    if (textContainer) {
      // Collect all direct children, preserving order and referencing original elements
      Array.from(textContainer.children).forEach(child => {
        colContent.push(child);
      });
    }
    return colContent;
  });

  // 3. Compose table data with the header and one row of columns
  const tableData = [
    ['Columns (columns81)'],
    columnCells
  ];

  // 4. Create and replace
  const table = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(table);
}
