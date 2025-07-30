/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid row that contains the columns
  const gridRow = element.querySelector('.aem-text-block.rds-layout__grid-row');
  if (!gridRow) return;

  // Get all direct column elements
  const columns = Array.from(gridRow.children).filter(col => col.classList && Array.from(col.classList).some(cls => cls.startsWith('rds-layout__grid-column-md-')));
  // For each column, get its content (all children, preserving structure)
  const colContents = columns.map(col => {
    // Only consider non-empty children (ignore empty text nodes)
    const nodes = Array.from(col.childNodes).filter(n => {
      if (n.nodeType === Node.TEXT_NODE && !n.textContent.trim()) return false;
      return true;
    });
    return nodes.length === 1 ? nodes[0] : nodes;
  });

  // Build the block table: header, then a single row with columns
  const cells = [
    ['Columns (columns8)'],
    colContents,
  ];
  
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
