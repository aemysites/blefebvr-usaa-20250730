/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row for the block, as in the example
  const headerRow = ['Columns (columns30)'];

  // 2. Extract the relevant content for the columns
  // Since there is only one column in the HTML, we use the .section-header div
  const sectionHeader = element.querySelector('.section-header');

  // Defensive: If sectionHeader doesn't exist, default to all children
  let cellContent = sectionHeader || element;

  // 3. Compose the cells for the block table
  // Only one column in the second row as per screenshot structure
  const cells = [
    headerRow,
    [cellContent]
  ];

  // 4. Create table and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
