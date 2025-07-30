/* global WebImporter */
export default function parse(element, { document }) {
  // Extract all direct <ul> children (each represents a column)
  const uls = Array.from(element.querySelectorAll(':scope > ul'));

  // For each <ul>, extract its <li> and use all its child nodes as the content for the column
  const cells = uls.map(ul => {
    const li = ul.querySelector('li');
    if (!li) return '';
    // Collect all element and non-empty text nodes
    const contentNodes = Array.from(li.childNodes).filter(
      node => node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim())
    );
    return contentNodes.length > 1 ? contentNodes : contentNodes[0];
  });
  // Create table
  const table = document.createElement('table');
  // Header row: one th with correct text and colspan equal to cell count if necessary
  const headerTr = document.createElement('tr');
  const th = document.createElement('th');
  th.textContent = 'Columns (columns24)';
  if (cells.length > 1) {
    th.setAttribute('colspan', cells.length);
  }
  headerTr.appendChild(th);
  table.appendChild(headerTr);
  // Content row: each column in a td
  const rowTr = document.createElement('tr');
  cells.forEach(cell => {
    const td = document.createElement('td');
    if (Array.isArray(cell)) {
      td.append(...cell);
    } else if (cell) {
      td.append(cell);
    }
    rowTr.appendChild(td);
  });
  table.appendChild(rowTr);
  // Replace the original element with the new table
  element.replaceWith(table);
}
