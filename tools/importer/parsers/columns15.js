/* global WebImporter */
export default function parse(element, { document }) {
  // Find the callout section containing the two columns
  const calloutSection = element.querySelector('section.callout-block');
  if (!calloutSection) return;

  // Find the grid row holding the two columns
  const gridRow = calloutSection.querySelector('.rds-layout__grid-row');
  if (!gridRow) return;

  // Get immediate children columns (should be two)
  const columns = gridRow.querySelectorAll(':scope > div');
  let col1 = null;
  let col2 = null;
  if (columns.length >= 2) {
    col1 = columns[0];
    col2 = columns[1];
  } else {
    // fallback: just return the calloutSection as a single cell
    const cells = [
      ['Columns (columns15)'],
      [calloutSection]
    ];
    const table = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(table);
    return;
  }

  // Header row must be a single column, followed by a content row with two columns
  const cells = [
    ['Columns (columns15)'], // One single cell in header row
    [col1, col2] // Second row: each column
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
