/* global WebImporter */
export default function parse(element, { document }) {
  // Find the two primary columns in the callout section
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  const firstCol = columns[0] || document.createElement('div');
  const secondCol = columns[1] || document.createElement('div');
  // The header row should be a single cell spanning both columns (workaround for table API: one cell in header row)
  const headerRow = ['Columns (columns13)'];
  const row = [firstCol, secondCol];
  const cells = [headerRow, row];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Set colspan on the header cell to span both columns
  const headerTr = table.querySelector('tr');
  if (headerTr && headerTr.children.length === 1) {
    headerTr.children[0].setAttribute('colspan', '2');
  }
  element.replaceWith(table);
}
