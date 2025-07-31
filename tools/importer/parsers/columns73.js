/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct li children as columns
  const columns = Array.from(element.querySelectorAll(':scope > li'));

  // For each li, use the .card-header content if present, else the whole li
  const columnCells = columns.map((li) => {
    const content = li.querySelector('.card-header') || li;
    return content;
  });

  // To ensure the header row is a single cell (one column, spanning all columns),
  // create a header row with one cell, use colspan if possible.
  // Since the WebImporter.DOMUtils.createTable uses the array structure,
  // the first row must be an array of one item, and the second row an array with N items.
  const tableRows = [
    ['Columns (columns73)'],
    columnCells
  ];

  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  // Adjust header cell colspan to span all columns (if more than 1 column)
  if (columnCells.length > 1) {
    const th = table.querySelector('tr:first-child th');
    if (th) th.setAttribute('colspan', columnCells.length);
  }

  element.replaceWith(table);
}
