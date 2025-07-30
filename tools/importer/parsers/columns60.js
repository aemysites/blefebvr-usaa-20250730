/* global WebImporter */
export default function parse(element, { document }) {
  // Find the row containing columns
  let gridRow = element.querySelector('.rds-layout__grid-row') || element;

  // Get direct grid columns (columns-12), or fallback to all children if not present
  const columns = Array.from(gridRow.querySelectorAll(':scope > .rds-layout__grid-column-12'));
  const colNodes = columns.length > 0 ? columns : Array.from(gridRow.children);

  // Collect the content for each column
  const columnCells = colNodes.map(col => {
    // Keep all non-empty elements and non-whitespace text nodes in order
    const nodes = Array.from(col.childNodes).filter(node => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const tag = node.tagName.toLowerCase();
        return tag !== 'script' && tag !== 'style';
      }
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent.trim().length > 0;
      }
      return false;
    });
    if (nodes.length === 1) return nodes[0];
    if (nodes.length > 1) return nodes;
    return '';
  });

  // Structure: header is always one cell, then next row is as many columns as needed
  const cells = [
    ['Columns (columns60)'], // header row: exactly one cell
    columnCells             // content row: N cells, each cell is a column
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
