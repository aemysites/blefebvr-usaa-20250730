/* global WebImporter */
export default function parse(element, { document }) {
  // Find all immediate child columns
  const columns = Array.from(element.querySelectorAll(':scope > .rds-layout__grid-column-12'));
  // For each column, extract its main display content
  const contentCells = columns.map(col => {
    // The first main content div in the column
    let mainContent = col.querySelector(':scope > div');
    if (!mainContent || mainContent.children.length === 0) {
      mainContent = col;
    }
    return mainContent;
  });

  // The header row must be a single cell
  const headerRow = ['Columns (columns45)'];
  // The second row is a single array of the column content elements
  const rows = [headerRow, contentCells];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
