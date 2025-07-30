/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate 'li' children representing columns
  const columns = Array.from(element.querySelectorAll(':scope > li'));
  if (!columns.length) return;

  // Each column content: prefer .card-header if present
  const contentRow = columns.map((li) => {
    const mainContent = li.querySelector(':scope > .card-header');
    return mainContent ? mainContent : li;
  });

  // The header row should contain only one cell (block name), per requirements
  const headerRow = ['Columns (columns43)'];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
