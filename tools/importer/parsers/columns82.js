/* global WebImporter */
export default function parse(element, { document }) {
  // Find all direct child columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, collect the heading and list
  const cells = columns.map(col => {
    // Heading (any level)
    const heading = col.querySelector('h1, h2, h3, h4, h5, h6');
    // List (ul/ol)
    const list = col.querySelector('ul, ol');
    // Compose a fragment
    const frag = document.createDocumentFragment();
    if (heading) frag.appendChild(heading);
    if (list) frag.appendChild(list);
    return frag.childNodes.length ? frag : document.createTextNode('');
  });

  // Build the table with a single header row and the columns row
  const tableData = [
    ['Columns (columns82)'], // Header must be a single cell row
    cells // Second row: one cell per column
  ];

  const table = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(table);
}
