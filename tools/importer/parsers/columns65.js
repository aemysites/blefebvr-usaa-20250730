/* global WebImporter */
export default function parse(element, { document }) {
  // The header row must be a single cell, per the requirements
  const headerRow = ['Columns (columns65)'];

  // Get all immediate <ul> elements (columns)
  const columns = Array.from(element.querySelectorAll(':scope > ul'));

  // The content row: one column per <ul>
  const contentRow = columns;

  // Compose the cells array: header (single cell), then content row (n cells)
  const cells = [
    headerRow,
    contentRow
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  
  // Replace the original element
  element.replaceWith(table);
}
