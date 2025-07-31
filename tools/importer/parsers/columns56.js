/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: single column with block name
  const headerRow = ['Columns (columns56)'];

  // Find all immediate column blocks
  const cols = Array.from(element.querySelectorAll(':scope > .usaa-aem-feature-item'));

  // Defensive fallback: if no columns found, use direct children
  const columns = cols.length ? cols : Array.from(element.children);

  // For each column, extract the correct content block
  const columnCells = columns.map(col => {
    // Each column's main content is the .aem-feature-collection__illustration-collection
    const illustration = col.querySelector('.aem-feature-collection__illustration-collection');
    return illustration ? illustration : col;
  });

  // Table rows: header (1 cell), then one row with N columns (N cells)
  const tableData = [headerRow, columnCells];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element
  element.replaceWith(table);
}
