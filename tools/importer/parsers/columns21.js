/* global WebImporter */
export default function parse(element, { document }) {
  // The correct table structure: first row is a single header cell, then each row is a column pair.
  const headerRow = ['Columns (columns21)'];
  const rows = [];
  // Find all ladder rows (each one becomes a content row)
  const ladders = element.querySelectorAll('.ladder');
  ladders.forEach((ladder) => {
    // Each ladder is a row with two columns (image/text in either order). 
    // Get only the immediate children of the ladder.
    const columns = Array.from(ladder.querySelectorAll(':scope > div'));
    // Add the array of elements directly as the row. If only one div, still works.
    rows.push(columns);
  });
  // Compose the table rows
  const tableRows = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
