/* global WebImporter */
export default function parse(element, { document }) {
  // Set the header as a single column, as per the example
  const headerRow = ['Columns (columns49)'];

  // Gather all direct li children (cards)
  const columns = Array.from(element.querySelectorAll(':scope > li'));

  // For each li, grab the .card-header or fallback to the li itself
  const contentRow = columns.map((li) => {
    const cardHeader = li.querySelector('.card-header');
    return cardHeader ? cardHeader : li;
  });

  // The table consists of a single header row (one cell), and a single row with one cell per column
  const rows = [headerRow, contentRow];

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}