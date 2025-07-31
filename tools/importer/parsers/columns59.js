/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid row containing the two columns
  const gridRow = element.querySelector('.rds-layout__grid-row');
  if (!gridRow) return;
  // Get all direct children that act as columns
  // Must preserve left and right column order
  const columns = [];
  // Left column: headline and description
  const leftCol = gridRow.querySelector('.rds-layout__grid-column-lg-6');
  if (leftCol) columns.push(leftCol);
  // Right column: image + call info
  // Could be 'rds-layout__grid-column' with offset class
  const rightCol = Array.from(gridRow.children).find(
    (col) => col !== leftCol && col.classList.contains('rds-layout__grid-column')
  );
  if (rightCol) columns.push(rightCol);

  // Compose cell content by referencing existing elements (not cloning)
  const contentRow = columns.map((col) => {
    // Wrap all children of col in a <div>, preserving structure
    const wrapper = document.createElement('div');
    Array.from(col.children).forEach((child) => {
      wrapper.appendChild(child);
    });
    // Remove empty wrapper if no content
    if (!wrapper.hasChildNodes()) return '';
    return wrapper;
  });

  // Only create table if at least one column has content
  if (!contentRow.length || contentRow.every(cell => !cell || (cell.textContent||'').trim() === '')) return;

  // Build the block table
  const table = WebImporter.DOMUtils.createTable([
    ['Columns (columns59)'],
    contentRow
  ], document);

  element.replaceWith(table);
}
