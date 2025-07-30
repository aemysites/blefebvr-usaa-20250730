/* global WebImporter */
export default function parse(element, { document }) {
  // Table header EXACTLY as specified
  const header = ['Columns (columns33)'];

  // Get all immediate children columns (2 expected, but allow for n columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  
  // For each column, collect all child nodes (preserving all content)
  const columnCells = columns.map((col) => {
    // Filter out empty text nodes
    const children = Array.from(col.childNodes).filter(
      node => node.nodeType !== 3 || node.textContent.trim() !== ''
    );
    if (children.length === 1) return children[0];
    return children;
  });

  const rows = [header, columnCells];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
